import React, { useEffect, useState, useRef, createRef } from "react";
import { useSearchParams } from "react-router-dom";

// MODULES
import esriConfig from "@arcgis/core/config"
import "@arcgis/map-components/components/arcgis-scene"
import "@arcgis/map-components/components/arcgis-expand"
import "@arcgis/map-components/components/arcgis-zoom"
import "@esri/calcite-components/components/calcite-shell"
import "@esri/calcite-components/components/calcite-shell-panel"
import "@esri/calcite-components/components/calcite-navigation"
import "@esri/calcite-components/components/calcite-navigation-logo"
import "@esri/calcite-components/components/calcite-accordion"
import "@esri/calcite-components/components/calcite-accordion-item"
import { watch, whenOnce } from "@arcgis/core/core/reactiveUtils.js"
import Camera from "@arcgis/core/Camera.js"
import "@arcgis/map-components/components/arcgis-navigation-toggle"
import "@arcgis/map-components/components/arcgis-compass"
import "@arcgis/map-components/components/arcgis-layer-list"
import BuildingFilter from "@arcgis/core/layers/support/BuildingFilter.js"
import BuildingSceneLayer from "@arcgis/core/layers/BuildingSceneLayer.js"

// CSS
import "./App.css";

// IMAGES
import iconCheck from "./../images/logo.png"

// HELPERS
const findLayers = async (layers, config) => {
  const layerId = config.layersForSelection[0].serviceLayerId
  const id = config.layersForSelection[0].id

  for (const layer of layers.toArray()) {
    await layer.load?.().catch(() => {});

    if (layer.id === id && layer?.layer?.id === layerId) {
      return layer;
    }

    if (layer.layers) {
      const found = await findLayers(layer.layers, config);
      if (found) return found;
    }

    if (layer.sublayers) {
      const found = await findLayers(layer.sublayers, config);
      if (found) return found;
    }
  }

  return null;
}

// COMPONENT
function App() {

  // STATE
  const [config, setConfig] = useState(null) // Application config
  const [isLoading, setIsLoading] = useState(true) // If application is in loading state
  const [queryParams] = useSearchParams() // URL params
  const [features, setFeatures] = useState([])

  // REF
  const sceneViewRef = useRef(null)
  const layerViewsRef = useRef(new Map())
  const selectedFeatureRef = useRef(null)

  // CONFIG
  const getData = async () => {

    const cfg = queryParams.get("config")

    const response = await fetch(`./config/${cfg ? cfg : 'default'}.json`)
    try {
      const json = await response.json();
      return json;
    } catch (err) {
      setLoadingDataError(`Konfigurační soubor '${cfg ? cfg : 'default'}.json' je neplatný nebo nebyl nalezen.`)
      setIsLoading(false)
    }
  }

  // VIEW
  const handleViewReady = async (event) => {
    const sceneElement = event.target

    // Set Camera
    const cam = new Camera({
      heading: config.initialSceneCamera.cameraHeading,
      tilt: config.initialSceneCamera.cameraTilt,
      position: {
        x: config.initialSceneCamera.cameraPosition[0],
        y: config.initialSceneCamera.cameraPosition[1],
        z: config.initialSceneCamera.cameraPosition[2],
        spatialReference: { wkid: sceneElement.spatialReference.wkid }
      }
    })

    sceneElement.camera = cam
    
    watch(
      () => [sceneElement.cameraPosition, sceneElement.cameraTilt, sceneElement.cameraHeading],
      ([cameraPosition, cameraTilt, cameraHeading]) => {
        // console.log("camera-position X: ", cameraPosition.x)
        // console.log("camera-position Y: ", cameraPosition.y)
        // console.log("camera-position Z: ", cameraPosition.z)
        // console.log("camera-tilt: ", cameraTilt)
        // console.log("camera-heading: ", cameraHeading)
      }
    ) 
    

    // Create list of features
    await sceneElement.view.when()

    sceneViewRef.current = sceneElement.view;

    const loadedFeatures = []
    for (const layer of config.layersForSelection) {
      const buildingComponentSublayer = await findLayers(sceneElement.view.map.layers, config)
         
      const featuresResponse = await buildingComponentSublayer.queryFeatures({
        where: "1=1",
        outFields: [layer.displayAttr, layer.oidField, layer.globalIdField],
        returnGeometry: true
      }) 
      loadedFeatures.push(
        ...featuresResponse.features.map((feature) => ({
          layerTitle: layer.title,
          parentLayer: buildingComponentSublayer.layer,
          displayAttr: layer.displayAttr,
          globalIdField: layer.globalIdField,
          oidField: layer.oidField,
          layer: buildingComponentSublayer,
          feature
        }))
      )
    }
    setFeatures(loadedFeatures);
  }

  const handleFeature = async (feature) => {
    const view = sceneViewRef.current
    if (!view) { return }

    // Dočasná průhledná client-side vrstva budovy
    const temporaryBuildingLayer = new BuildingSceneLayer({
      url: feature.parentLayer.url,
      opacity: 0.06,
      listMode: "hide"

    })
    view.map.add(temporaryBuildingLayer, 0)

    // Filtrace prvku ve vrstvě budovy
    const globalIdField = feature.globalIdField
    const globalIdValue = feature.feature.attributes[globalIdField]
    feature.layer.visible = true;
    const buildingFilter = new BuildingFilter({
      filterBlocks: [{
        filterExpression: `${globalIdField} = '${globalIdValue}'`,
        filterMode: {
          type: "solid"
        }
      }]
    })
    const buildingLayerView = await view.whenLayerView(feature.parentLayer)
    feature.parentLayer.filters = [buildingFilter]
    feature.parentLayer.activeFilterId = buildingFilter.id

    await whenOnce(() => !buildingLayerView.updating)

    // Posun scény na filtrovaný prvek
    if (feature.feature.geometry) {
      await view.goTo(
        {
          target: feature.feature,
          tilt: 65,
          scale: 200
        },
        {
          duration: 1000
        }
      )
    }

    // Zvýraznění filtrovaného prvku
    selectedFeatureRef.current?.remove();
    selectedFeatureRef.current = null;
    selectedFeatureRef.current = buildingLayerView.highlight(
      feature.feature
    )
  }

  // USE EFFECTS
  // Load config
  useEffect(() => {

    (async () => {

      // Load app config 
      const initConfig = await getData()
      esriConfig.portalUrl = initConfig.portalUrl
      document.title = initConfig.appName
      setConfig( initConfig )
    
    })()
   
  }, []);

  // RETURN
  return (
    <>
    { config &&
      <calcite-shell content-behind>
        <calcite-navigation slot="header" scale="m">
          <calcite-navigation-logo
            slot="logo"
            thumbnail={iconCheck}
            scale="l"
            heading={config.appName}
            description="Demonstrace možnosti výběru částí BIM ve scéně"
          ></calcite-navigation-logo>
        </calcite-navigation>
        <arcgis-scene 
          id="Scene"
          item-id={config.sceneItemId} 
          onarcgisViewReadyChange={handleViewReady}
        >
          <arcgis-zoom slot="top-left"></arcgis-zoom>
          <arcgis-navigation-toggle slot="top-left"></arcgis-navigation-toggle>
          <arcgis-compass slot="top-left"></arcgis-compass>
        </arcgis-scene>
        <calcite-shell-panel slot="panel-end" display-mode="float-content">
          <calcite-accordion
            selection-mode="single"
          >
            <calcite-accordion-item
              description="Filtrování částí modelu ve scéně" heading="Filtr" icon-start="filter"
            >
              {features.length === 0 ? 
              <calcite-loader 
                label="Načítám seznam prvků..." 
                scale="s" 
                text="Načítám seznam prvků..."
                type="indeterminate">
              </calcite-loader> :
              <calcite-list 
                  filter-enabled={true}
                >
                  {
                    features.map((feature) => (
                      <calcite-list-item 
                        key={`${feature.feature.layer.id}-${feature.feature.attributes[feature.oidField]}`} 
                        label={feature.feature.attributes[feature.displayAttr]} 
                        description={feature.layerTitle} 
                        value={feature.feature.attributes[feature.displayAttr]}
                        onClick={() => handleFeature(feature)}
                        >
                      </calcite-list-item>
                    ))
                  }
                </calcite-list> 
              }
            </calcite-accordion-item>
            <calcite-accordion-item
              description="Vrstvy scény" heading="Vrstvy" icon-start="layers"
            >
              <arcgis-layer-list reference-element="Scene" show-filter={true}></arcgis-layer-list>
            </calcite-accordion-item>
          </calcite-accordion>
        </calcite-shell-panel>
      </calcite-shell>
    }
    </>
  );
}

export default App;

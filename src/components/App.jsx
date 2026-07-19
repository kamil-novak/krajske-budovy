import React, { useEffect, useState, useRef, createRef } from "react";
import { useSearchParams } from "react-router-dom";

// MODULES
import esriRequest from "@arcgis/core/request"
import esriId from "@arcgis/core/identity/IdentityManager"
import esriConfig from "@arcgis/core/config"
import "@arcgis/map-components/components/arcgis-scene"
import WebMap from "@arcgis/core/WebMap"
import Graphic from "@arcgis/core/Graphic"
import Point from "@arcgis/core/geometry/Point"
import Polyline from "@arcgis/core/geometry/Polyline"
import Polygon from "@arcgis/core/geometry/Polygon"
import * as bufferOperator from "@arcgis/core/geometry/operators/bufferOperator"
import "@arcgis/map-components/components/arcgis-expand"
import "@arcgis/map-components/components/arcgis-legend"
import "@arcgis/map-components/components/arcgis-map"
import "@arcgis/map-components/components/arcgis-search"
import "@arcgis/map-components/components/arcgis-zoom"
import "@arcgis/charts-components/components/arcgis-chart"
import "@esri/calcite-components/components/calcite-shell"
import "@esri/calcite-components/components/calcite-shell-panel"
import "@esri/calcite-components/components/calcite-navigation"
import "@esri/calcite-components/components/calcite-navigation-logo"
import "@esri/calcite-components/components/calcite-accordion"
import "@esri/calcite-components/components/calcite-accordion-item"
import { watch } from "@arcgis/core/core/reactiveUtils.js"
import Camera from "@arcgis/core/Camera.js"
import "@arcgis/map-components/components/arcgis-navigation-toggle"
import "@arcgis/map-components/components/arcgis-compass"
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js"
import "@arcgis/map-components/components/arcgis-layer-list"
import FeatureEffect from "@arcgis/core/layers/support/FeatureEffect.js"
import FeatureFilter from "@arcgis/core/layers/support/FeatureFilter.js"
import BuildingFilter from "@arcgis/core/layers/support/BuildingFilter.js"

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
        console.log("camera-position X: ", cameraPosition.x)
        console.log("camera-position Y: ", cameraPosition.y)
        console.log("camera-position Z: ", cameraPosition.z)
        console.log("camera-tilt: ", cameraTilt)
        console.log("camera-heading: ", cameraHeading)
      }
    ) 
    

    // Create list of features
    await sceneElement.view.when()

    sceneViewRef.current = sceneElement.view;

    const loadedFeatures = []
    for (const layer of config.layersForSelection) {
      const buildingComponentSublayer = await findLayers(sceneElement.view.map.layers, config)
      console.log("URL: ", buildingComponentSublayer.layer.url)
      console.log("Podpora supportsLayerQuery: ", buildingComponentSublayer.getFieldUsageInfo())
      console.log("Nadřazená vrstva: ", buildingComponentSublayer.layer.title)
      console.log("Typ vrstvy: ", buildingComponentSublayer.type)
      console.log("Global ID Filed: ", buildingComponentSublayer.globalIdField)
         
      const featuresResponse = await buildingComponentSublayer.queryFeatures({
        where: "1=1",
        outFields: [layer.displayAttr, "OID", "GlobalId"],
        returnGeometry: true
      }) 
      loadedFeatures.push(
        ...featuresResponse.features.map((feature) => ({
          layerTitle: layer.title,
          parentLayer: buildingComponentSublayer.layer,
          displayAttr: layer.displayAttr,
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

    //feature.parentLayer.opacity = 0.1

    feature.layer.visible = true;
    const buildingFilter = new BuildingFilter({
      filterBlocks: [{
        filterExpression: `GlobalId = '${feature.feature.attributes.GlobalId}'`,
        filterMode: {
          type: "solid"
        }
      },
      {
        filterExpression: `GlobalId <> '${feature.feature.attributes.GlobalId}'`,
        filterMode: {
          type: "wire-frame",
          edges: {
            type: "solid",
            color: [255, 255, 255, 0.3],
            size: 0.4
          }
        }
      }]
    })
    feature.parentLayer.filters = [buildingFilter]
    feature.parentLayer.activeFilterId = buildingFilter.id

    if (feature.feature.geometry) {
      await view.goTo(
        {
          target: feature.feature,
          tilt: 65,
          scale: 250
        },
        {
          duration: 1000
        }
      )
    }

    // Odstranění předchozího zvýraznění
    selectedFeatureRef.current?.remove();
    selectedFeatureRef.current = null;

    const layerView = await view.whenLayerView(feature.parentLayer)

    selectedFeatureRef.current = layerView.highlight(
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
                        key={`${feature.feature.layer.id}-${feature.feature.attributes.OID}`} 
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

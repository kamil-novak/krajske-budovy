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
import "@esri/calcite-components/components/calcite-action"
import "@esri/calcite-components/components/calcite-button"
import "@esri/calcite-components/components/calcite-loader"
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
const findLayers = async (layers, layerConfig, parentLayers = []) => {
  const layerId = layerConfig.serviceLayerId
  const id = layerConfig.id

  for (const layer of layers.toArray()) {
    await layer.load?.().catch(() => {});
    const layerHierarchy = [...parentLayers, layer]

    if (layer.id === id && layer?.layer?.id === layerId) {
      return { layer, layerHierarchy };
    }

    if (layer.layers) {
      const found = await findLayers(layer.layers, layerConfig, layerHierarchy);
      if (found) return found;
    }

    if (layer.sublayers) {
      const found = await findLayers(layer.sublayers, layerConfig, layerHierarchy);
      if (found) return found;
    }
  }

  return null;
}

const getDisplayFields = (displayField) =>
  [...displayField.matchAll(/\{([^}]+)\}/g)].map((match) => match[1])

const getDisplayText = (displayField, attributes) =>
  displayField.replace(/\{([^}]+)\}/g, (_, field) => attributes[field] ?? "")

const getFilterValue = (value) =>
  typeof value === "number" ? value : `'${String(value).replaceAll("'", "''")}'`

const zoomToFeature = async (view, feature, buildingLayerView, signal) => {
  const sublayerView = await whenOnce(
    () => buildingLayerView.sublayerViews.find((sublayerView) => sublayerView.sublayer === feature.layer),
    { signal }
  )
  const query = sublayerView.createQuery()
  query.objectIds = [feature.feature.getObjectId()]

  await whenOnce(() => !sublayerView.updating, { signal })
  let { extent } = await sublayerView.queryExtent(query, { signal })

  // Client-side queries only include models already loaded in the view.
  if (!extent) {
    await view.goTo(
      { target: [feature.parentLayer.fullExtent], tilt: 65 },
      { duration: 1000, signal }
    )
    await whenOnce(() => !view.updating && !sublayerView.updating, { signal })
    const result = await sublayerView.queryExtent(query, { signal })
    extent = result.extent
  }

  if (!extent || !Number.isFinite(extent.zmin) || !Number.isFinite(extent.zmax)) {
    throw new Error("The selected feature's 3D extent is not available.")
  }

  // Fit the complete 3D bounds around their center, including the model's height.
  await view.goTo(
    { target: [extent], tilt: 65 },
    { duration: 1000, signal }
  )
}

const handleLayerListItemCreated = (event) => {
  if (!event.item.parent) {
    event.item.actionsSections = [[{
      title: "Přiblížit",
      icon: "magnifying-glass-plus",
      id: "full-extent"
    }]]
  }
}

// COMPONENT
function App() {

  // STATE
  const [queryParams] = useSearchParams() // URL params
  const [config, setConfig] = useState(null) // Application config
  const [isLoading, setIsLoading] = useState(queryParams.has("find")) // If application is in loading state
  const [features, setFeatures] = useState([])
  const [selectedFeature, setSelectedFeature] = useState(null)

  // REF
  const sceneViewRef = useRef(null)
  const layerViewsRef = useRef(new Map())
  const temporaryBuildingLayersRef = useRef([])
  const selectedFeatureRef = useRef(null)
  const activeFeatureRef = useRef(null)
  const layerVisibilityRef = useRef(new Map())
  const buildingFilterStateRef = useRef(null)
  const featureNavigationRef = useRef(null)

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

    await sceneElement.view.when()

    sceneViewRef.current = sceneElement.view;

    const loadedFeatures = []
    for (const layer of config.layersForSelection) {
      // Find layer in webscene
      const {
        layer: buildingComponentSublayer,
        layerHierarchy
      } = await findLayers(sceneElement.view.map.layers, layer)

      // Create transparent version of the scene layer
      const existsParentLayer = temporaryBuildingLayersRef.current.some(
        layer => layer.title === buildingComponentSublayer.layer.title
      )
      if (!existsParentLayer) {
        const temporaryBuildingLayer = new BuildingSceneLayer({
          title: buildingComponentSublayer.layer.title,
          url: buildingComponentSublayer.layer.url,
          opacity: 0.06,
          listMode: "hide",
          visible: false
        })
        temporaryBuildingLayersRef.current.push(temporaryBuildingLayer)
        sceneElement.view.map.add(temporaryBuildingLayer, 0)
      }
           
      // List all features of layer
      const displayFields = getDisplayFields(layer.displayField)
      const featuresResponse = await buildingComponentSublayer.queryFeatures({
        where: "1=1",
        outFields: [...new Set([...displayFields, layer.uniqueField, buildingComponentSublayer.objectIdField])],
        returnGeometry: true
      }) 

      // Create list of features
      loadedFeatures.push(
        ...featuresResponse.features.map((feature) => ({
          serviceLayerId: layer.serviceLayerId,
          id: layer.id,
          layerTitle: layer.title,
          parentLayer: buildingComponentSublayer.layer,
          displayField: layer.displayField,
          uniqueField: layer.uniqueField,
          layer: buildingComponentSublayer,
          layerHierarchy,
          feature
        }))
      )
    }
    setFeatures(loadedFeatures);

    // Query parametr find
    if (queryParams.has("find")) {
      try {
        const find = queryParams.get("find").split(",")
        if (find.length >= 3) {
          const uniqueValue = find.slice(2).join(",")
          const feature = loadedFeatures.find((feature) =>
            String(feature.serviceLayerId) === find[0]
            && String(feature.id) === find[1]
            && String(feature.feature.attributes[feature.uniqueField]) === uniqueValue
          )
          if (feature) {
            await handleFeature(feature)
          }
        }
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleLayerListAction = async (event) => {
    if (event.detail.action.id === "full-extent") {
      const layer = await event.detail.item.layer.load()
      if (layer.fullExtent) {
        await sceneViewRef.current?.goTo(layer.fullExtent)
      }
    }
  }

  const clearFeatureSelection = (feature) => {
    featureNavigationRef.current?.abort()
    featureNavigationRef.current = null

    for (const parentLayer of temporaryBuildingLayersRef.current) {
      if (parentLayer.title === feature.parentLayer.title) {
        parentLayer.visible = false
      }
    }

    const filterState = buildingFilterStateRef.current
    if (filterState) {
      filterState.layer.filters = filterState.filters
      filterState.layer.activeFilterId = filterState.activeFilterId
    }

    for (const [layer, visible] of layerVisibilityRef.current) {
      layer.visible = visible
    }

    selectedFeatureRef.current?.remove()
    selectedFeatureRef.current = null
    activeFeatureRef.current = null
    layerVisibilityRef.current.clear()
    buildingFilterStateRef.current = null
    setSelectedFeature(null)
  }

  const handleFeature = async (feature) => {
    const view = sceneViewRef.current
    if (!view) { return }

    // Remove from selection
    const activeFeature = activeFeatureRef.current
    if (activeFeature?.serviceLayerId === feature.serviceLayerId
        && activeFeature.id === feature.id
        && activeFeature.feature.attributes[activeFeature.uniqueField]
        === feature.feature.attributes[feature.uniqueField]) {
      clearFeatureSelection(feature)
      return
    }

    if (activeFeature) {
      clearFeatureSelection(activeFeature)
    }

    layerVisibilityRef.current = new Map(
      feature.layerHierarchy.map((layer) => [layer, layer.visible])
    )
    for (const layer of feature.layerHierarchy) {
      layer.visible = true
    }

    activeFeatureRef.current = feature
    setSelectedFeature(feature)
    const navigation = new AbortController()
    featureNavigationRef.current = navigation

    // Filter feature
    const uniqueField = feature.uniqueField
    const uniqueValue = feature.feature.attributes[uniqueField]
    const buildingFilter = new BuildingFilter({
      filterBlocks: [{
        filterExpression: `${uniqueField} = ${getFilterValue(uniqueValue)}`,
        filterMode: {
          type: "solid"
        }
      }]
    })
    const buildingLayerView = await view.whenLayerView(feature.parentLayer)
    if (navigation.signal.aborted) { return }
    buildingFilterStateRef.current = {
      layer: feature.parentLayer,
      filters: feature.parentLayer.filters.map((filter) => filter.clone()),
      activeFilterId: feature.parentLayer.activeFilterId
    }
    feature.parentLayer.filters = [buildingFilter]
    feature.parentLayer.activeFilterId = buildingFilter.id

    // Highlight feature
    selectedFeatureRef.current?.remove();
    selectedFeatureRef.current = null;
    selectedFeatureRef.current = buildingLayerView.highlight(
      feature.feature
    )

    // Enable client-side transparent layer
    for (const parentLayer of temporaryBuildingLayersRef.current ) {
      if (parentLayer.title === feature.parentLayer.title) {
        parentLayer.visible = true
      }
    }

    try {
      await zoomToFeature(view, feature, buildingLayerView, navigation.signal)
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error(error)
      }
    }
  }

  const getFeatureLink = (feature) => {
    const url = new URL(window.location.href)
    url.searchParams.set("find", [
      feature.serviceLayerId,
      feature.id,
      feature.feature.attributes[feature.uniqueField]
    ].join(","))
    return url.href
  }

  const copyFeatureLink = async (event, feature) => {
    event.stopPropagation()
    await navigator.clipboard.writeText(getFeatureLink(feature))
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
        <div className="scene-container">
          <arcgis-scene 
            id="Scene"
            item-id={config.sceneItemId} 
            onarcgisViewReadyChange={handleViewReady}
          >
            <arcgis-zoom slot="top-left"></arcgis-zoom>
            <arcgis-navigation-toggle slot="top-left"></arcgis-navigation-toggle>
            <arcgis-compass slot="top-left"></arcgis-compass>
          </arcgis-scene>
          {isLoading &&
            <div className="scene-loading-overlay">
              <calcite-loader
                label="Načítám prvek z URL parametru..."
                scale="l"
                text="Načítám prvek z URL parametru..."
                type="indeterminate"
              ></calcite-loader>
            </div>
          }
        </div>
        <calcite-shell-panel slot="panel-end" display-mode="float-content" width="m">
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
              <>
                <calcite-button
                  width="full"
                  scale="s"
                  disabled={!selectedFeature}
                  onClick={() => handleFeature(selectedFeature)}
                >
                  Zrušit filtr
                </calcite-button>
                <calcite-list 
                  filter-enabled={true}
                  selection-mode="single"
                  selection-appearance="highlight"
                >
                  {
                    features.map((feature) => (
                      <calcite-list-item 
                        key={`${feature.serviceLayerId}-${feature.id}-${feature.feature.attributes[feature.uniqueField]}`}
                        label={getDisplayText(feature.displayField, feature.feature.attributes)}
                        description={feature.layerTitle} 
                        value={getDisplayText(feature.displayField, feature.feature.attributes)}
                        selected={selectedFeature === feature}
                        onClick={() => handleFeature(feature)}
                        >
                        <calcite-action
                          slot="actions-end"
                          icon="link"
                          text="Kopí­rovat odkaz na prvek"
                          title="Kopí­rovat odkaz na prvek"
                          onClick={(event) => copyFeatureLink(event, feature)}
                        ></calcite-action>
                      </calcite-list-item>
                    ))
                  }
                </calcite-list> 
              </>
              }
            </calcite-accordion-item>
            <calcite-accordion-item
              description="Vrstvy scény" heading="Vrstvy" icon-start="layers"
            >
              <arcgis-layer-list
                reference-element="Scene"
                show-filter={true}
                listItemCreatedFunction={handleLayerListItemCreated}
                onarcgisTriggerAction={handleLayerListAction}
              ></arcgis-layer-list>
            </calcite-accordion-item>
          </calcite-accordion>
        </calcite-shell-panel>
      </calcite-shell>
    }
    </>
  );
}

export default App;

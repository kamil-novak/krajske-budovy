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
import "@arcgis/map-components/components/arcgis-expand";
import "@arcgis/map-components/components/arcgis-legend";
import "@arcgis/map-components/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-search";
import "@arcgis/map-components/components/arcgis-zoom";
import "@arcgis/charts-components/components/arcgis-chart";
import "@esri/calcite-components/components/calcite-shell";
import "@esri/calcite-components/components/calcite-navigation";
import "@esri/calcite-components/components/calcite-navigation-logo";
import { watch } from "@arcgis/core/core/reactiveUtils.js";
import Camera from "@arcgis/core/Camera.js";
import "@arcgis/map-components/components/arcgis-navigation-toggle";
import "@arcgis/map-components/components/arcgis-compass";

// CSS
import "./App.css";

// IMAGES
import iconCheck from "./../images/logo.png"

// COMPONENT
function App() {

  // STATE
  const [config, setConfig] = useState(null) // Application config
  const [isLoading, setIsLoading] = useState(true) // If application is in loading state
  const [queryParams] = useSearchParams() // URL params

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
  const handleViewReady = (event) => {
    const viewElement = event.target

    const cam = new Camera({
      heading: config.initialSceneCamera.cameraHeading,
      tilt: config.initialSceneCamera.cameraTilt,
      position: {
        x: config.initialSceneCamera.cameraPosition[0],
        y: config.initialSceneCamera.cameraPosition[1],
        z: config.initialSceneCamera.cameraPosition[2],
        spatialReference: { wkid: viewElement.spatialReference.wkid }
      }
    })

    viewElement.camera = cam

    watch(
      () => [viewElement.cameraPosition, viewElement.cameraTilt, viewElement.cameraHeading],
      ([cameraPosition, cameraTilt, cameraHeading]) => {
        console.log("camera-position X: ", cameraPosition.x)
        console.log("camera-position Y: ", cameraPosition.y)
        console.log("camera-position Z: ", cameraPosition.z)
        console.log("camera-tilt: ", cameraTilt)
        console.log("camera-heading: ", cameraHeading)
      }
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
          item-id={config.sceneItemId} 
          onarcgisViewReadyChange={handleViewReady}
        >
          <arcgis-zoom slot="top-left"></arcgis-zoom>
          <arcgis-navigation-toggle slot="top-left"></arcgis-navigation-toggle>
          <arcgis-compass slot="top-left"></arcgis-compass>
        </arcgis-scene>
      </calcite-shell>
    }
    </>
  );
}

export default App;

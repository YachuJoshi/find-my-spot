import { useState, useEffect, useRef } from "react";
import cx from "classnames";
import { useParkingSpaceContext } from "../context";
import { getCurrentLocation } from "../utils";
import {
  getNearestParkingSpotLocation,
  getAssignedParkingSpotStatus,
} from "../services";
import Location from "../icons/pin.png";
import Car from "../icons/car.png";
import { useInterval } from "../hooks";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";

import styles from "./Map.module.scss";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

export const Map = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const direction = useRef(null);
  const [lng, setLng] = useState(85.324);
  const [lat, setLat] = useState(27.7172);
  const [zoom, setZoom] = useState(14);
  const { parkingSpace, setParkingSpace } = useParkingSpaceContext();
  const [_, setIsSpotEmpty] = useState(false);
  const {
    img_name: imgName,
    name,
    longitude,
    latitude,
    distance,
  } = parkingSpace;
  console.log(parkingSpace);

  useEffect(() => {
    if (Object.keys(parkingSpace).length < 1) {
      return setIsSpotEmpty(false);
    }
    setIsSpotEmpty(true);
  }, [parkingSpace]);

  useInterval(async () => {
    if (!parkingSpace.id) return;

    const isAvailable = await getAssignedParkingSpotStatus(parkingSpace.id);
    setIsSpotEmpty(isAvailable);

    if (!isAvailable) {
      try {
        const { currentLat, currentLng } = await getCurrentLocation();
        const pSpace = await getNearestParkingSpotLocation(
          currentLng,
          currentLat
        );
        setParkingSpace(pSpace);
        direction.current.setDestination([pSpace.longitude, pSpace.latitude]);
      } catch (e) {
        console.log("No free parking spaces detected");
      }
    }
  }, 5000);

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom,
    });

    map.current.on("load", () => {
      map.current.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
          showUserHeading: true,
        })
      );

      map.current.addControl(new mapboxgl.NavigationControl());

      direction.current = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        profile: "mapbox/cycling",
        interactive: false,
        controls: {
          profileSwitcher: false,
          instructions: false,
        },
      });

      map.current.addControl(direction.current, "top-left");
    });
  }, [lng, lat, zoom]);

  useEffect(() => {
    if (!map.current) return;

    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(5));
      setLat(map.current.getCenter().lat.toFixed(5));
      setZoom(map.current.getZoom().toFixed(2));
    });
  }, []);

  // eslint-disable-next-line
  useEffect(async () => {
    if (!map.current) return;

    try {
      const { currentLat, currentLng } = await getCurrentLocation();
      map.current.on("load", () => {
        direction.current.setOrigin([currentLng, currentLat]);
        direction.current.setDestination([
          parkingSpace.longitude,
          parkingSpace.latitude,
        ]);
      });
    } catch (e) {
      console.log(e);
    }
  }, [parkingSpace]);

  return (
    <div>
      <div ref={mapContainer} className={styles.MapContainer} />
      {Object.keys(parkingSpace).length > 0 && (
        <div
          className={cx(styles.DetailOverlay, {
            [styles.Hidden]: !isNavOpen,
          })}
        >
          <button
            type="button"
            onClick={() => setIsNavOpen((isNavOpen) => !isNavOpen)}
            className={styles.ToggleBtn}
          ></button>
          <div className={styles.Detail}>
            <h1 className={styles.ParkSpotName}>{name}</h1>
            <span className={styles.LocationDetail}>
              <img src={Location} className={styles.LocationIcon} alt="Icon" />
              <p className={styles.Location}>
                {+longitude.toFixed(9)}, {+latitude.toFixed(9)}
              </p>
            </span>
            <span className={styles.DistanceDetail}>
              <img src={Car} className={styles.DistanceIcon} alt="Icon" />
              <p className={styles.Distance}>{+distance.toFixed(3)} Meters</p>
            </span>
            <figure className={styles.ParkSpotFig}>
              <img
                src={`/${imgName}`}
                alt="Free Parking Spot"
                className={styles.ParkSpotImg}
              />
            </figure>
          </div>
        </div>
      )}
    </div>
  );
};

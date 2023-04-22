import { useState, useEffect } from "react";
import cx from "classnames";
import { Loader } from "../components";
import { useParkingSpaceContext } from "../context";
import { getCurrentLocation } from "../utils";
import { getNearestParkingSpotLocation } from "../services";
import bike from "../icons/bycicle.png";
import car from "../icons/sport-car.png";
import styles from "./Home.module.scss";
import { Redirect } from "react-router-dom";

export const Home = () => {
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [error, setError] = useState(false);
  const [vehicle, setVehicle] = useState("");
  const { setParkingSpace } = useParkingSpaceContext();

  const updateVehicle = (newVehicle) => {
    return setVehicle(newVehicle);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!vehicle) return;

    setIsFormComplete(true);

    try {
      const { currentLat, currentLng } = await getCurrentLocation();
      const pSpace = await getNearestParkingSpotLocation(
        currentLng,
        currentLat
      );
      setParkingSpace(pSpace);
      setTimeout(() => {
        setLoading(false);
        setRedirect(true);
      }, 2000);
    } catch (e) {
      setError(true);
    }
  };

  useEffect(() => {
    return () => {
      setRedirect(false);
    };
  }, []);

  if (redirect) {
    return <Redirect to="/maps" />;
  }

  return (
    <div className={styles.Wrapper}>
      <div className={styles.Background} />
      {error ? (
        <h1 className={styles.Heading}>Something Went Wrong</h1>
      ) : loading && isFormComplete ? (
        <Loader />
      ) : (
        <>
          <h1 className={styles.Heading}>Choose your vehicle</h1>
          <div className={styles.FormContainer}>
            <form className={styles.Form}>
              <div className={styles.VehicleOptionContainer}>
                <button
                  type="button"
                  onClick={() => updateVehicle("Bike")}
                  className={cx(styles.Option, {
                    [styles.Chosen]: vehicle === "Bike",
                  })}
                >
                  <img src={bike} alt="Bike" />
                  <p>Bike</p>
                </button>
                <button
                  type="button"
                  onClick={() => updateVehicle("Car")}
                  className={cx(styles.Option, {
                    [styles.Chosen]: vehicle === "Car",
                  })}
                >
                  <img src={car} alt="Car" />
                  <p>Car</p>
                </button>
              </div>
              <button
                onClick={onSubmit}
                type="submit"
                className={styles.SubmitBtn}
              >
                Search
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

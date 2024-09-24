import CustomHead from "../components/CustomHead";
import { Dimmer, Loader } from "semantic-ui-react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/pages/local-weather.module.scss";
import { Layout } from "../components/Layout";

export default function LocalWeather(): JSX.Element {
  const [weather, setWeather] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("");
  // const [currentLocation, setCurrentLocation] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let location = {
      latitude: null,
      longitude: null,
    };

    navigator.geolocation.getCurrentPosition((position) => {
      location = position.coords;
      const { latitude, longitude } = location;
      if (latitude && longitude) {
        getCurrentLocationWeather(longitude, latitude);
        setIsLoading(false);
      }
      // TODO: implement with free Geocoding API
      // axios
      //   .get(
      //     `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=`
      //   )
      //   .then((response: any) => {
      //     setCurrentLocation(response.data.results[6].formatted_address);
      //   })
      //   .catch((e) => {
      //     console.error(e);
      //   });
    });
  }, []);

  async function getCurrentLocationWeather(longitude, latitude) {
    const response: any = await axios
      .post("api/weather-api", {
        targetUrl: `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}`,
        method: "POST",
      })
      .catch((e) => {
        console.error(e);
      });

    setWeather(response.data.weather[0].description);
    setWeatherIcon(response.data.weather[0].icon);
  }

  if (isLoading) {
    return (
      <Dimmer active={true} inverted>
        <CustomHead />
        <Loader inline="centered" size="huge">
          Loading
        </Loader>
      </Dimmer>
    );
  }

  return (
    <div className={styles["local-weather-wrapper"]}>
      <Layout>
        <h1 className={styles["local-weather-wrapper__title"]}>
          Current Location Weather
        </h1>
        <div className={styles["current-weather"]}>
          <div>
            {/* <p>Current Location : {currentLocation}</p> */}
            <p>Current Weather : {weather}</p>
            <p>
              Weather Icon :
              <img
                src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
                alt="weather icon"
                width={40}
                height={40}
              />
            </p>
          </div>
        </div>
      </Layout>
    </div>
  );
}

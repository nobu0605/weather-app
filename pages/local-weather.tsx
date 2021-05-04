import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/pages/local-weather.module.scss";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function LocalWeather(): JSX.Element {
  const [weather, setWeather] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");

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
      }
      axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.NEXT_PUBLIC_OPEN_GOOGLE_MAP_API_KEY}`
        )
        .then((response: any) => {
          setCurrentLocation(response.data.results[6].formatted_address);
        })
        .catch((e) => {
          console.error(e);
        });
    });
  }, []);

  function getCurrentLocationWeather(longitude, latitude) {
    axios
      .post(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_MAP_API_KEY}`
      )
      .then((response: any) => {
        setWeather(response.data.weather[0].description);
        setWeatherIcon(response.data.weather[0].icon);
      })
      .catch((e) => {
        console.error(e);
      });
  }

  return (
    <div className={styles["local-weather-wrapper"]}>
      <Header />
      <h1 className={styles["local-weather-wrapper__title"]}>
        Current Location Weather
      </h1>
      <div className={styles["current-weather"]}>
        <div>
          <p>Current Location : {currentLocation}</p>
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
      <Footer />
    </div>
  );
}

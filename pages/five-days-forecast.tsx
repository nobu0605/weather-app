import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/pages/five-days-forecast.module.scss";
import { useRouter } from "next/router";
import axios from "axios";
import moment from "moment";
import { Dimmer, Loader } from "semantic-ui-react";

FiveDaysForecast.getInitialProps = ({ query }) => {
  return { query };
};

export default function FiveDaysForecast(): JSX.Element {
  const [weatherList, setWeatherList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({
    notFound: false,
  });
  const router = useRouter();
  const cityName = router.query.city;

  useEffect(() => {
    getFiveDaysWeather();
  }, []);

  async function getFiveDaysWeather() {
    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?units=metric&q=${cityName}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_MAP_API_KEY}`
      )
      .then((response: any) => {
        setWeatherList(response.data.list);
      })
      .catch((e) => {
        console.error(e);
        errors["notFound"] = true;
        if (e.response.status === 404) {
          setErrors(errors);
        }
      });
    setIsLoading(false);
  }

  if (isLoading) {
    return (
      <Dimmer active={true} inverted>
        <Header />
        <Loader inline="centered" size="huge">
          Loading
        </Loader>
      </Dimmer>
    );
  }

  if (errors.notFound) {
    return (
      <div className={styles["five-days-wrapper"]}>
        <Header />
        <h1 className={styles["five-days-wrapper__title"]}>
          The city you searched is not found.
        </h1>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles["five-days-wrapper"]}>
      <Header />
      <h1 className={styles["five-days-wrapper__title"]}>
        5 days / 3 hours forecast in {cityName}
      </h1>
      <div className={styles["five-days-wrapper__container"]}>
        <ul className={styles["horizontal-list"]}>
          <li className={styles["horizontal-list__item"]}>
            <p>Date Time</p>
            <p>Weather</p>
            <p>Weather Icon</p>
            <p>Temperature</p>
          </li>
          {weatherList.map((weather: any, Index: number) => {
            return (
              <li className={styles["horizontal-list__item"]} key={Index}>
                <p>
                  {moment(weather.dt * 1000).format("MM/D H:00")}
                  &nbsp;&nbsp;
                </p>
                <p>{weather.weather[0].description}</p>
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt="weather icon"
                  width="40"
                  height="40"
                />
                <p>
                  <span style={{ color: "red" }}>
                    {Math.floor(weather.main.temp_max)}
                  </span>
                  /
                  <span style={{ color: "blue" }}>
                    {Math.floor(weather.main.temp_min)}
                  </span>
                </p>
              </li>
            );
          })}
        </ul>
      </div>
      <Footer />
    </div>
  );
}

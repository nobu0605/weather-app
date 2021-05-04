import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Head from "next/head";
import Footer from "../components/Footer";
import styles from "../styles/pages/index.module.scss";
import { japanCities, japanCitiesInRegion } from "../constants/cities";
import { japanRegions } from "../constants/regions";
import { Dimmer, Loader } from "semantic-ui-react";
import { City } from "../types/city";
import { getCityWeather } from "../utils/weather";
import CityCard from "../components/CityCard";
import CityList from "../components/CityList";

export default function Home(): JSX.Element {
  const [cityCardInfo, setCityCardInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const result = getCityWeather(japanCities, cityCardInfo, setIsLoading);
    setCityCardInfo(result);
  }, []);

  if (isLoading) {
    return (
      <Dimmer active={true} inverted>
        <Loader inline="centered" size="huge">
          Loading
        </Loader>
      </Dimmer>
    );
  }

  return (
    <div className={styles["home-wrapper"]}>
      <Head>
        <title>Social Media Preview</title>
        <meta property="og:url" content="https://www.google.com" />
        <meta property="og:type" content="website" />
        <meta property="fb:app_id" content="487392449070633" />
        <meta property="og:title" content="Social Media Preview Working?" />
        <meta name="twitter:card" content="summary" />
        <meta
          property="og:description"
          content="Hurray!! Yes Social Media Preview is Working"
        />
        <meta
          property="og:image"
          content={
            "https://assets.coderrocketfuel.com/twitter-post-with-node-js.png"
          }
        />
      </Head>
      <h1 className={styles["home-wrapper__title"]}>
        Current weather in Japan
      </h1>
      <div className={styles["home-wrapper__container"]}>
        <div className={styles["home-wrapper__japan-map"]}>
          <ul className={styles["cities"]}>
            {cityCardInfo.map((city: City, Index: number) => {
              return <CityCard city={city} key={Index} />;
            })}
          </ul>
        </div>
      </div>
      <CityList regions={japanRegions} citiesInRegion={japanCitiesInRegion} />
      <Footer></Footer>
    </div>
  );
}

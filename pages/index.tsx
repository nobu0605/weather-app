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
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <meta name="google" content="notranslate" />
        <title># 投稿企画 OGP</title>
        <meta property="og:url" content="https://www.google.com/" />
        <meta property="og:title" content="# 投稿企画 OGP" />
        <meta property="og:description" content="OGP" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://assets.coderrocketfuel.com/twitter-post-with-node-js.png"
        />
        <meta
          property="og:image:secure_url"
          content="https://assets.coderrocketfuel.com/twitter-post-with-node-js.png"
        />
        <meta property="og:image:width" content="910" />
        <meta property="og:image:height" content="478" />
        <meta property="og:site_name" content="# 投稿企画 OGP" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="# 投稿企画 OGP" />
        <meta name="twitter:url" content="https://www.google.com/" />
        <meta name="twitter:description" content="OGP" />
        <meta
          name="twitter:image"
          content="https://assets.coderrocketfuel.com/twitter-post-with-node-js.png"
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

import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/pages/index.module.scss";
import { japanCities, japanCitiesInRegion } from "../constants/cities";
import { japanRegions } from "../constants/regions";
import { Dimmer, Loader } from "semantic-ui-react";
import { City } from "../types/city";
import { getCityWeather } from "../utils/weather";
import CityCard from "../components/CityCard";
import CityList from "../components/CityList";

type Props = {
  contents?: {
    title: string;
    description: string;
    keyword: string;
    image: string;
    url: string;
  };
};

export default function Home(props: Props): JSX.Element {
  console.log("Home props: ", props);
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
      <Header contents={props.contents} />
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

export async function getServerSideProps() {
  const contents = {
    title: "Weather app",
    description: "Weather app",
    keyword: "Weather app",
    image: `${process.env.NEXT_PUBLIC_BASE_URL}/sun.jpg`,
    url: "https://weather-data-application.herokuapp.com",
  };
  return { props: { contents } };
}

import React from "react";
import styles from "../styles/components/CityList.module.scss";

type JapanRegionList = {
  Hokkaido: Array<string>;
  Tohoku: Array<string>;
  KantoKoshinetsu: Array<string>;
  TokaiHokurikuKinki: Array<string>;
  ChugokuShikoku: Array<string>;
  Kyushu: Array<string>;
  Okinawa: Array<string>;
};

type WorldRegionList = {
  NorthAmerica: Array<string>;
  SouthAmerica: Array<string>;
  Asia: Array<string>;
  Australia: Array<string>;
  Europe: Array<string>;
  Africa: Array<string>;
};

type CityList = {
  regions: Array<string>;
  citiesInRegion: JapanRegionList | WorldRegionList;
};

export default function CityList(props: CityList): JSX.Element {
  const { regions, citiesInRegion } = props;
  let trimedRegionName = "";
  let typeOfNumber = "";

  return (
    <div className={styles["regions"]}>
      <ul className={styles["regions__lists"]}>
        {regions.map((region: string, regionIndex: number) => {
          trimedRegionName = region.replace(/\s/g, "");
          typeOfNumber = regionIndex % 2 == 0 ? "even" : "odd";
          return (
            <li
              className={`${styles["regions__list"]} ${styles[typeOfNumber]}`}
              key={regionIndex}
            >
              <p className={styles["regions__region-name"]}>
                {region}&nbsp;&nbsp;
              </p>
              <div className={styles["regions__city-list"]}>
                {citiesInRegion[trimedRegionName].map(
                  (city: string, cityIndex: number) => {
                    return (
                      <span key={cityIndex}>
                        <a className={styles["regions__city-name"]}>{city}</a>
                        {/* Index number starts from 0. So I added 1. */}
                        {cityIndex + 1 !==
                          citiesInRegion[trimedRegionName].length && (
                          <span style={{ margin: "10px" }}>|</span>
                        )}
                      </span>
                    );
                  }
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
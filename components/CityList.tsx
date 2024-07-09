import React from "react";
import styles from "../styles/components/CityList.module.scss";
import Link from "next/link";

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
  let oddOrEvenNumber = "";

  return (
    <div className={styles["regions"]}>
      <ul className={styles["regions__lists"]}>
        {regions.map((region: string, regionIndex: number) => {
          trimedRegionName = region.replace(/\s/g, "");
          oddOrEvenNumber = regionIndex % 2 == 0 ? "even" : "odd";
          return (
            <li
              className={`${styles["regions__list"]} ${styles[oddOrEvenNumber]}`}
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
                        <Link href={`/five-days-forecast?city=${city}`}>
                          <span className={styles["regions__city-name"]}>
                            {city}
                          </span>
                        </Link>
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

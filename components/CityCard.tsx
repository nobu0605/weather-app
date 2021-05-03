import React from "react";
import styles from "../styles/components/CityCard.module.scss";
import Link from "next/link";

type CityCard = {
  city: {
    name: string;
    weatherIcon: string;
    temp_max: number;
    temp_min: number;
  };
  nameForStyle?: string;
  key: number;
};

export default function CityCard(props: CityCard): JSX.Element {
  const { name, weatherIcon, temp_max, temp_min } = props.city;
  const nameForStyle = props.nameForStyle ? props.nameForStyle : name;

  return (
    <Link href={`/five-days-forecast?city=${name}`}>
      <a>
        <li className={styles[`cities__${nameForStyle}`]}>
          <span className={styles[`cities__name`]}>{name}</span>
          <img
            src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
            alt="weather icon"
            width="40"
            height="40"
          />
          <span>
            <span style={{ color: "red" }}>{Math.floor(temp_max)}</span>
            &nbsp;/&nbsp;
            <span style={{ color: "blue" }}>{Math.floor(temp_min)}</span>
          </span>
        </li>
      </a>
    </Link>
  );
}

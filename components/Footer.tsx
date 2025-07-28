import React from "react";
import styles from "../styles/components/Footer.module.scss";

export default function Footer(): JSX.Element {
  return (
    <footer className={styles.title}>
      Weather data provided by{" "}
      <a
        className={styles.link}
        href="https://openweathermap.org/"
        target="_blank"
        rel="noopener noreferrer"
      >
        OpenWeather
      </a>
    </footer>
  );
}

import React from "react";
import Head from "next/head";
import { Menu } from "semantic-ui-react";
import styles from "../styles/components/Header.module.scss";
import Link from "next/link";

export default function Header(): JSX.Element {
  return (
    <div className={styles["header-wrapper"]}>
      <Head>
        <title>Weather app</title>
      </Head>
      <div className={styles["header-top"]}>
        <Link href="/">
          <a>
            <h1 className={styles["header-title"]}>Weather app</h1>
          </a>
        </Link>
      </div>
      <Menu
        className={styles["header-menu"]}
        inverted
        style={{ borderRadius: "0", paddingLeft: "20px" }}
      >
        <Link href="/">
          <Menu.Item name="home" />
        </Link>
        <Link href="/local-weather">
          <Menu.Item name="local weather" />
        </Link>
        <Link href="/world-weather">
          <Menu.Item name="world weather" />
        </Link>
        <Link href="/cities">
          <Menu.Item name="city list" />
        </Link>
      </Menu>
    </div>
  );
}

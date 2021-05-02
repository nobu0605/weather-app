import React from "react";
import Head from "next/head";
import { Menu } from "semantic-ui-react";
import styles from "../styles/components/Header.module.scss";
import Link from "next/link";

export default function Header(): JSX.Element {
  return (
    <div>
      <Head>
        <title>Weather app</title>
      </Head>
      <h1 className={styles.title}>Weather app</h1>
      <Menu inverted style={{ borderRadius: "0", paddingLeft: "20px" }}>
        <Link href="/">
          <Menu.Item name="home" />
        </Link>
        <Link href="/local-weather">
          <Menu.Item name="local weather" />
        </Link>
        <Link href="/world-weather">
          <Menu.Item name="world weather" />
        </Link>
      </Menu>
    </div>
  );
}
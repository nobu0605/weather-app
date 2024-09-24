import React from "react";
import { Menu } from "semantic-ui-react";
import styles from "../styles/components/Header.module.scss";
import Link from "next/link";
import CustomHead from "./CustomHead";

type Props = {
  contents?: {
    title: string;
    description: string;
    keyword: string;
    image: string;
    url: string;
  };
};

export default function Header(props: Props): JSX.Element {
  return (
    <div className={styles["header-wrapper"]}>
      <CustomHead contents={props.contents} />
      <div className={styles["header-top"]}>
        <Link href="/">
          <h1 className={styles["header-title"]}>Weather app</h1>
        </Link>
      </div>
      <Menu
        className={styles["header-menu"]}
        inverted
        style={{ borderRadius: 0, paddingLeft: "20px" }}
      >
        <Link href="/">
          <Menu.Item name="home" className={styles["header-menu-item"]} />
        </Link>
        <Link href="/local-weather">
          <Menu.Item
            name="local weather"
            className={styles["header-menu-item"]}
          />
        </Link>
        <Link href="/world-weather">
          <Menu.Item
            name="world weather"
            className={styles["header-menu-item"]}
          />
        </Link>
        <Link href="/cities">
          <Menu.Item name="city list" className={styles["header-menu-item"]} />
        </Link>
      </Menu>
    </div>
  );
}

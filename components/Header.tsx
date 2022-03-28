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
  query?: any;
};

export default function Header(props: Props): JSX.Element {
  return (
    <div className={styles["header-wrapper"]}>
      <CustomHead contents={props.contents} query={props.query} />
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
        style={{ borderRadius: 0, paddingLeft: "20px" }}
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

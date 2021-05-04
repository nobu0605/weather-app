import React from "react";
import Head from "next/head";
import { Menu } from "semantic-ui-react";
import styles from "../styles/components/Header.module.scss";
import Link from "next/link";

interface Props {
  contents: {
    title: string;
    description: string;
    keyword: string;
    image: string;
    url: string;
  };
}

export default function Header(props: Props): JSX.Element {
  const initialContents = {
    title: "Weather app",
    description: "Weather app",
    keyword: "Weather app",
    image: "/sun.png",
    url: "https://weather-data-application.herokuapp.com/",
  };
  const contents = props.contents ? props.contents : initialContents;
  const { title, description, keyword, image, url } = contents;

  return (
    <div className={styles["header-wrapper"]}>
      <Head>
        <title>Weather app</title>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta name="keywords" content={keyword} />
        <meta property="og:type" content="blog" />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={image} />
        <meta property="og:site_name" content={title} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content={image} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
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

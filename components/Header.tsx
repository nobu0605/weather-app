import React from "react";
import Head from "next/head";
import { Menu } from "semantic-ui-react";
import styles from "../styles/components/Header.module.scss";
import Link from "next/link";

type Props = {
  contents?: {
    title: string;
    description: string;
    keyword: string;
    image: string;
    url: string;
  };
  children: any;
};

export default function Header(props: Props): JSX.Element {
  console.log("Header props: ", props);
  const initialContents = {
    title: "Weather app",
    description: "Weather app",
    keyword: "Weather app",
    image: `${process.env.NEXT_PUBLIC_BASE_URL}/sun.jpg`,
    url: "https://weather-data-application.herokuapp.com",
  };
  const { title, description, keyword, image, url } = props.contents
    ? props.contents
    : initialContents;

  console.log("description: ", description);
  return (
    <div className={styles["header-wrapper"]}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="description" content={description}></meta>
        <title>Weather app</title>

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta name="keywords" content={keyword} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={image} />
        <meta property="og:image:secure_url" content={image} />
        <meta property="og:image:width" content="910" />
        <meta property="og:image:height" content="478" />
        <meta property="og:site_name" content={title} />
        <meta
          property="fb:app_id"
          content={process.env.NEXT_PUBLIC_OPEN_FACEBOOK_APP_ID}
        />

        <meta name="twitter:site" content="@Proceed_ios" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <link rel="canonical" href={url} />

        {/* <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <meta name="google" content="notranslate" />
        <title># 投稿企画 OGP</title>
        <meta property="og:url" content="https://www.google.com/" />
        <meta property="og:title" content="# 投稿企画 OGP" />
        <meta property="og:description" content="OGP" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://assets.coderrocketfuel.com/twitter-post-with-node-js.png"
        />
        <meta
          property="og:image:secure_url"
          content="https://assets.coderrocketfuel.com/twitter-post-with-node-js.png"
        />
        <meta property="og:image:width" content="910" />
        <meta property="og:image:height" content="478" />
        <meta property="og:site_name" content="# 投稿企画 OGP" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="# 投稿企画 OGP" />
        <meta name="twitter:url" content="https://www.google.com/" />
        <meta name="twitter:description" content="OGP" />
        <meta
          name="twitter:image"
          content="https://assets.coderrocketfuel.com/twitter-post-with-node-js.png"
        /> */}
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
      {props.children}
    </div>
  );
}

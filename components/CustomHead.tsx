import React from "react";
import Head from "next/head";

type Props = {
  contents?: {
    title: string;
    description: string;
    keyword: string;
    image: string;
    url: string;
  };
};

export default function CustomHead(props: Props): JSX.Element {
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

  return (
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

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <link rel="canonical" href={url} />
    </Head>
  );
}

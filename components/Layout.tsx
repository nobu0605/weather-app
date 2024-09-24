import Header from "../components/Header";
import Footer from "../components/Footer";
import React from "react";
import styles from "../styles/components/Layout.module.scss";

type Props = {
  contents?: {
    title: string;
    description: string;
    keyword: string;
    image: string;
    url: string;
  };
  children: React.ReactNode;
};

export function Layout({ children, contents }: Props): JSX.Element {
  return (
    <div>
      <Header contents={contents} />
      <div className={styles["layout-body"]}>{children}</div>
      <Footer />
    </div>
  );
}

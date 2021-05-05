import React, {
  useState,
  useEffect,
  useReducer,
  useRef,
  useCallback,
} from "react";
import _ from "lodash";
import { Search } from "semantic-ui-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/pages/cities.module.scss";
import { cities, citiesForSearch } from "../constants/cities";
import Link from "next/link";

const initialState = {
  loading: false,
  results: [],
  value: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "CLEAN_QUERY":
      return initialState;
    case "START_SEARCH":
      return { ...state, loading: true, value: action.query };
    case "FINISH_SEARCH":
      return { ...state, loading: false, results: action.results };

    default:
      throw new Error();
  }
}

export default function FiveDaysForecast(): JSX.Element {
  const [allCities, setAllCities] = useState(cities);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { loading, results, value } = state;

  const timeoutRef: any = useRef();
  const handleSearchChange = useCallback((e, data) => {
    const value =
      data.result && data.result.title ? data.result.title : e.target.value;
    clearTimeout(timeoutRef.current);
    dispatch({ type: "START_SEARCH", query: value });
    timeoutRef.current = setTimeout(() => {
      if (data && data.value && data.value.length === 0) {
        dispatch({ type: "CLEAN_QUERY" });
        return;
      }
      const regex = new RegExp(_.escapeRegExp(value), "i");
      const isMatch = (result) => regex.test(result.title);
      dispatch({
        type: "FINISH_SEARCH",
        results: _.filter(citiesForSearch, isMatch),
      });
    }, 300);

    const regex = new RegExp(value, "g");
    setAllCities(allCities.filter((value) => value.match(regex)));
  }, []);

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  let oddOrEvenNumber = "";

  return (
    <div className={styles["cities-wrapper"]}>
      {/* <Header /> */}
      <h1 className={styles["cities-wrapper__title"]}>City List</h1>
      <div className={styles["search"]}>
        <Search
          className={styles["search__input"]}
          loading={loading}
          onResultSelect={(e, data) => handleSearchChange(e, data)}
          onSearchChange={handleSearchChange}
          results={results}
          value={value}
        />
      </div>
      <div className={styles["cities"]}>
        <ul className={styles["cities__lists"]}>
          <div className={styles["cities__city-section"]}>
            {allCities.map((city: string, cityIndex: number) => {
              oddOrEvenNumber = cityIndex % 2 == 0 ? "even" : "odd";
              return (
                <li
                  key={cityIndex}
                  className={`${styles["cities__list"]} ${styles[oddOrEvenNumber]}`}
                >
                  <p className={styles["cities__region-name"]}>
                    <Link href={`/five-days-forecast?city=${city}`}>
                      <a className={styles["cities__city-name"]}>{city}</a>
                    </Link>
                  </p>
                </li>
              );
            })}
          </div>
        </ul>
      </div>
      <Footer />
    </div>
  );
}

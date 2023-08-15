import React, { useEffect, useState } from "react";
import "./index.scss";

/** @type {string[]} */
const Suggestions = [
  "apple",
  "banana",
  "orange",
  "grape",
  "mango",
  "strawberry",
  "blueberry",
  "cherry",
  "peach",
  "pear",
  "nectarine",
  "apricot",
  "plum",
  "kiwi",
  "watermelon",
  "cantaloupe",
  "honeydew",
  "melon",
  "pineapple",
  "fig",
  "date",
  "coconut",
  "durian",
  "lychee",
  "longan",
  "rambutan",
  "jackfruit",
  "passionfruit",
  "starfruit",
  "pomegranate",
  "guava",
  "mangosteen",
  "longan",
  "dragonfruit",
  "custard apple",
  "soursop",
  "nance",
  "breadfruit",
  "persimmon",
  "jujube",
  "mulberry",
  "gooseberry",
  "tamarind",
];

/**
 *
 * @param {string} query
 * @returns {Promise<string[]>}
 */
const getAutoCompleteResults = (query) => {
  console.log("API called for", query);
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(
        Suggestions.filter((s) => s.includes(query?.toString().toLowerCase()))
      );
    }, Math.random() * 1000);
  });
};

export default function Autocomplete() {
  const [searchTerm, setSearchTerm] = useState();
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const debouncedValue = useDebounce(searchTerm, 200);

  const onChangeSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    let cancel = false;
    const handleSearch = async () => {
      if (!debouncedValue) {
        setSuggestions([]);
        return;
      }
      setLoading(true);
      const result = await getAutoCompleteResults(debouncedValue);
      if (!cancel) setSuggestions(result);
      setLoading(false);
    };

    handleSearch();

    return () => {
      cancel = true;
    };
  }, [debouncedValue]);

  return (
    <div className="autocomplete__container">
      <div className="searchbox__container">
        <div className="">
          <svg
            className="search__icon"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>
        <input
          type="text"
          name="searchbox"
          id="searchbox"
          placeholder="Type to search..."
          onChange={onChangeSearch}
        />
      </div>
      {Array.isArray(suggestions) && suggestions.length ? (
        <ul tabIndex={0} className="suggestions">
          {suggestions.map((s, i) => (
            <li tabIndex={0} key={i}>
              {s}
            </li>
          ))}
        </ul>
      ) : loading ? (
        <p>Loading...</p>
      ) : null}
    </div>
  );
}

function useDebounce(searchTerm, timeLimit) {
  const [debounceValue, setDebounceValue] = useState(searchTerm);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(searchTerm);
    }, timeLimit);
    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm, timeLimit]);

  return debounceValue;
}

import React, { useState, useEffect, useRef } from "react";

import Card from "../UI/Card";
import ErrorModal from "../UI/ErrorModal";
import useHttp from "../../hooks/http";
import "./Search.css";

const Search = React.memo(({ onFilterIngredients }) => {
  const [searchTitle, setSearchTitle] = useState("");
  const searchInputRef = useRef();
  const [
    isLoading,
    error,
    data,
    sendRequest,,,
    clear,
  ] = useHttp();

  useEffect(() => {
    if (!isLoading && !error && data) {
      const loadedIngredients = [];
      for (const id in data) {
        loadedIngredients.push({ id, ...data[id] });
      }
      onFilterIngredients(loadedIngredients);
    }
  }, [isLoading, error, data, onFilterIngredients]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTitle !== searchInputRef.current.value) return;
      const query =
        searchTitle.length === 0
          ? ""
          : `?orderBy="title"&equalTo="${searchTitle}"`;
      sendRequest(
        "https://react-hooks-c609e.firebaseio.com/ingredients.json" + query,
        "GET"
      );
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [searchTitle, searchInputRef, sendRequest]);

  return (
    <section className="search">
      {error && <ErrorModal onClose={clear}>{error.message}</ErrorModal>}
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          {isLoading && <span>Loading...</span>}
          <input
            type="text"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            ref={searchInputRef}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;

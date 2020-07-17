import React, { useState, useEffect, useRef } from "react";

import Card from "../UI/Card";
import "./Search.css";

const Search = React.memo(({ onFilterIngredients }) => {
  const [searchTitle, setSearchTitle] = useState("");
  const searchInputRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      if (searchTitle !== searchInputRef.current.value) return;
      const query =
        searchTitle.length === 0
          ? ""
          : `?orderBy="title"&equalTo="${searchTitle}"`;
      fetch("https://react-hooks-c609e.firebaseio.com/ingredients.json" + query)
        .then((res) => res.json())
        .then((body) => {
          const loadedIngredients = [];
          for (const id in body) {
            loadedIngredients.push({ id, ...body[id] });
          }
          onFilterIngredients(loadedIngredients);
        });
    }, 500);
  }, [searchTitle, onFilterIngredients, searchInputRef]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
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

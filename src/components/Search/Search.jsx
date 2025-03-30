import { useState, useEffect } from "react";
import css from "./Search.module.css";

export default function Search({ onSubmit }) {
  const [query, setQuery] = useState("");

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(query);
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <input
        className={css.input}
        type="text"
        name="query"
        value={query}
        onChange={handleChange}
      />
      <button className={css.searchBttn} type="submit">
        Search
      </button>
    </form>
  );
}

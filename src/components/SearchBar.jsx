import React from "react";
import "../styles/searchbar.css";

function SearchBar({ query, onChange }) {
  return (
    <form className="search-bar" role="search" onSubmit={(e) => e.preventDefault()}>
      <input
        className="search-input"
        type="search"
        placeholder="Buscar juegos..."
        aria-label="Buscar"
        value={query}
        onChange={(e) => onChange(e.target.value)}
      />
      <button className="search-button" type="submit">Buscar</button>
    </form>
  );
}

export default SearchBar;

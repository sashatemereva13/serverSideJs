import { useState } from "react";
import "../css/searchBar.css";

const SearchBar = ({ onSearch }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(value);
  };

  return (
    <form onSubmit={handleSubmit} className="searchBar">
      <input
        type="text"
        placeholder="Search students..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;

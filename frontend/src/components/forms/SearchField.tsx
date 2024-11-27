import React from "react";
import styles from "./SearchField.module.css";

const SearchField = ({ onSubmit, extraStyle = "" }) => {
  const [searchText, setSearchText] = React.useState("");

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(searchText);
  };
  return (
    <form className={`${styles.search} ${extraStyle}`} onSubmit={handleSubmit}>
      <input
        name="searchField"
        id="searchField"
        className={styles["search-field"]}
        type="text"
        placeholder="Pesquisar mídia..."
        value={searchText}
        onChange={handleChange}
      />
      <input
        type="submit"
        id="magnifyingGlass"
        className={styles["magnifying-glass"]}
        value="Buscar"
      />
    </form>
  );
};

export default SearchField;

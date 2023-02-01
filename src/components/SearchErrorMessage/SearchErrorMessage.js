import React from "react";

import "./SearchErrorMessage.css";

function SearchErrorMessage({ searchErrorMessage }) {
  return <p className="search-error-message__text">{searchErrorMessage}</p>;
}

export default SearchErrorMessage;

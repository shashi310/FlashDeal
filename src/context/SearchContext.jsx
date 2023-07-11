import React, { createContext, useContext, useState } from "react";

export const searchContext = createContext();

const SearchContextProvider = ({ children }) => {
  const [string, setString] = useState("");
  const [searchBtn, setSearchBtn] = useState(false);

  function handleSearchString(str) {
    setString(str);
  }

  function handleOnSearchBtn() {
    setSearchBtn(true);
  }

  function handleOffSearchBtn() {
    setSearchBtn(false);
  }

  return (
    <searchContext.Provider
      value={{
        string,
        handleSearchString,
        searchBtn,
        handleOnSearchBtn,
        handleOffSearchBtn,
      }}
    >
      {children}
    </searchContext.Provider>
  );
};

export default SearchContextProvider;

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Box, ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import SearchContextProvider from "./context/SearchContext";
import CartLengthContext from "./context/CartLengthContext";

const theme = extendTheme({
  colors: {
    brand: {
      100: "#e40046",
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Box bg={"#f7f7f7"}>
    <BrowserRouter>
      <CartLengthContext>
        <ChakraProvider theme={theme}>
          <SearchContextProvider>
            <App />
          </SearchContextProvider>
        </ChakraProvider>
      </CartLengthContext>
    </BrowserRouter>
  </Box>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

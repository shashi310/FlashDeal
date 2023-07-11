import React, { createContext, useEffect, useState } from "react";

export const cartLen = createContext();

const CartLengthContext = ({ children }) => {
  let user = localStorage.getItem("user") || null;
  //   let initialState = JSON.parse(localStorage.getItem(user))?.length || 0;
  const [initialState, setInitialState] = useState(0);

  const [updatedCart, setUpdatedCart] = useState();

  useEffect(() => {
    setInitialState(JSON.parse(localStorage.getItem(user))?.length || 0);
    // console.log(JSON.parse(localStorage.getItem(user))?.length);
    if (JSON.parse(localStorage.getItem(user))?.length == 0) {
      setInitialState(0);
    }
  }, []);

  useEffect(() => {
    if (updatedCart) {
      setInitialState(updatedCart);
    }
  });

  function updateInitialState() {
    setUpdatedCart(JSON.parse(localStorage.getItem(user))?.length || 0);
  }

  return (
    <cartLen.Provider value={{ initialState, updateInitialState }}>
      {children}
    </cartLen.Provider>
  );
};

export default CartLengthContext;

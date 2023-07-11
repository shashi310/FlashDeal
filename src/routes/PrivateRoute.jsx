import { Box } from "@chakra-ui/react";
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  let user = localStorage.getItem("user");

  //   console.log("USER", user);
  if (!user) {
    return <Navigate to={"/login"} />;
  }
  return <Box>{children}</Box>;
};

export default PrivateRoute;

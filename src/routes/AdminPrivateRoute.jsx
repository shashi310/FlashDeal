import { Box } from "@chakra-ui/react";
import React from "react";
import { Navigate } from "react-router-dom";

const AdminPrivateRoute = ({ children }) => {
  let admin = localStorage.getItem("admin");

  if (!admin) {
    return <Navigate to={"/adminLogin"} />;
  }

  return <Box>{children}</Box>;
};

export default AdminPrivateRoute;

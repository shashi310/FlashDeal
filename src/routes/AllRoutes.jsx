import { Box } from "@chakra-ui/react";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Admin from "../pages/Admin";
import Landing from "../pages/Landing";
import ProductsPage from "../pages/ProductsPage";
import SingleProduct from "../pages/SingleProduct";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Cart from "../pages/Cart";
import PrivateRoute from "./PrivateRoute";
import AdminLogin from "../pages/AdminLogin";
import AdminPrivateRoute from "./AdminPrivateRoute";
import OrderHistory from "../pages/OrderHistory";

const AllRoutes = ({ searchString }) => {
  return (
    <Box>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/admin"
          element={
            <AdminPrivateRoute>
              <Admin />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/products"
          element={<ProductsPage searchString={searchString} />}
        />
        <Route path="/singleProduct" element={<SingleProduct />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <OrderHistory />
            </PrivateRoute>
          }
        />
      </Routes>
    </Box>
  );
};

export default AllRoutes;

import { Box } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import OrderCard from "../components/OrderHistory/OrderCard";

const OrderHistory = () => {
  let url = process.env.REACT_APP_LOCAL_URL;
  let UID = localStorage.getItem("userID");

  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    fetchOrdersHistory();
  }, []);

  function fetchOrdersHistory() {
    axios
      .get(`${url}/users/${UID}`)
      .then((res) => {
        setOrderHistory(res.data.history);
        console.log(orderHistory);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Box w={{ "2xl": "80%" }} m={"auto"}>
      <Box>
        {orderHistory.map((order, i) => {
          return <OrderCard key={i} data={order} />;
        })}
      </Box>
    </Box>
  );
};

export default OrderHistory;

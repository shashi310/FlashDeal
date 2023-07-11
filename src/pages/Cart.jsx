import {
  Box,
  Button,
  Flex,
  Heading,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import CartCard from "../components/Cart/CartCard";
import { Navigate, useNavigate } from "react-router-dom";
import { cartLen } from "../context/CartLengthContext";
import axios from "axios";
import moment from "moment/moment";

const Cart = () => {
  let url = process.env.REACT_APP_LOCAL_URL;
  let UID = localStorage.getItem("userID");

  const navigate = useNavigate();
  const toast = useToast();
  const [spinner, setSpinner] = useState(false);
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [totalPrice, setTotalPrice] = useState(0);
  const [purchased, setPurchased] = useState(false);
  const [history, setHistory] = useState([]);
  const [buy, setBuy] = useState(false);
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem(user)) || []
  );

  const { updateInitialState } = useContext(cartLen);

  useEffect(() => {
    calculateTotal();
    updateInitialState();
  }, [cart]);

  useEffect(() => {
    if (buy) {
      updateHistory();
    }
  }, [history]);

  function calculateTotal() {
    let price = cart.reduce((acc, item) => {
      acc = acc + item.price * item.Qty;
      return acc;
    }, 0);
    setTotalPrice(price);
  }

  function handleQty(product, num) {
    let updatedCart = cart.map((item) => {
      if (item.id == product.id) {
        if (num > 0) {
          item.Qty += num;
          return item;
        } else {
          if (item.Qty > 1) {
            item.Qty += num;
            return item;
          } else {
            toast({
              title: "Item quantity can't be less than one.",
              description: "Use the remove buttom to remove item form cart.",
              status: "warning",
              duration: 3000,
              isClosable: true,
              position: "top",
            });
          }
        }
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem(user, JSON.stringify(cart));
    // console.log(cart);
  }

  function handleRemove(id) {
    // console.log(id);
    let updateCart = cart.filter((item) => {
      return item.id != id;
    });
    setCart(updateCart);
    localStorage.setItem(user, JSON.stringify(updateCart));
  }

  function handleBuyNow() {
    setBuy(true);
    setSpinner(true);
    axios
      .get(`${url}/users/${UID}`)
      .then((res) => {
        // console.log(res);
        let data = res.data;
        setHistory(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function updateHistory(data) {
    // console.log(data);
    // setHistory((prev) => {
    //   prev = data;
    //   return prev;
    // });
    let date = moment().format("MMMM Do YYYY, h:mm:ss a");
    let historyObj = {
      date: date,
      orderTotal: totalPrice,
      prducts: [...cart],
    };
    history?.history?.unshift(historyObj);
    // history.unshift(historyObj);
    // console.log(history);
    axios
      .patch(`${url}/users/${UID}`, history)
      .then((res) => {
        // console.log(res);
        setCart([]);
        toast({
          title: "Order Placed.",
          description: `${user} thankyou for shooping with us. Your order has been successfully placed.`,
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
        localStorage.setItem(user, JSON.stringify([]));
        updateInitialState();
        // navigate("/");
        setPurchased(true);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setSpinner(false);
        setBuy(false);
      });
  }

  if (purchased) {
    return <Navigate to={"/"} />;
  }

  return (
    <Box w={{ base: "90%", "2xl": "80%" }} m={"auto"} mt={"4rem"}>
      <Flex direction={{ base: "column", md: "row" }}>
        <Box w={{ md: "65%", "2xl": "70%" }}>
          {cart.map((product) => {
            return (
              <CartCard
                key={product.id}
                product={product}
                handleQty={handleQty}
                handleRemove={handleRemove}
              />
            );
          })}
        </Box>
        <Box
          m={{ base: "auto", md: "5px" }}
          h={"fit-content"}
          w={{ base: "95%", md: "35%", "2xl": "30%" }}
          bg={"white"}
          p={4}
        >
          <Heading fontWeight={600}>Cart Details</Heading>
          <Text fontWeight={500} fontSize={{ xl: "xl", "2xl": "lg" }}>
            Cart Item : {cart.length}
          </Text>
          <Text fontWeight={500} fontSize={{ xl: "xl", "2xl": "lg" }}>
            Total Price: ₹ {totalPrice}
          </Text>
          <Button
            mt={1}
            onClick={() => {
              cart.length > 0 && handleBuyNow();
            }}
            w={"100%"}
            _hover={{ backgroundColor: "brand.100" }}
            variant="solid"
            bg="brand.100"
            color={"white"}
          >
            {spinner ? <Spinner /> : "Buy Now"}
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default Cart;

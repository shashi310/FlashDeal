import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  useRadioGroup,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import RadioCard from "../components/SingleProduct/RadioCard";
import { cartLen } from "../context/CartLengthContext";
import { useNavigate } from "react-router-dom";

const SingleProduct = () => {
  // let product = JSON.parse(localStorage.getItem("product")) || null;
  const [product, setProduct] = useState(
    JSON.parse(localStorage.getItem("product")) || null
  );

  const { updateInitialState } = useContext(cartLen);

  const navigate = useNavigate();

  const options = ["S", "M", "L", "XL", "2XL"];
  const [productSize, setProductSize] = useState("");
  const toast = useToast();
  let user = localStorage.getItem("user");
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem(user)));
  // JSON.parse(localStorage.getItem(user)) || []

  useEffect(() => {
    localStorage.setItem(user, JSON.stringify(cart));
    updateInitialState();
  }, [cart]);

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "framework",
    defaultValue: "react",
    onChange: setProductSize,
  });

  function callingErrorToast(title, message) {
    toast({
      title: title,
      description: message,
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  }

  function callingSuccessToast(title, message) {
    toast({
      title: title,
      description: message,
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
  }

  function handleBuyNow() {
    let productExists = false;

    productExists = cart.some((item) => item.id == product.id);

    if (!user) {
      callingErrorToast("Login required!", "Please Login first.");
    } else if (!productSize) {
      callingErrorToast(
        "Product size not selected!",
        "Please select the product size and then try adding to cart."
      );
    } else if (productExists) {
      callingErrorToast(
        "Product Already in Cart!",
        "If you want to change the quantity of product go to cart."
      );
    } else {
      // cart.push({ ...product, size: productSize, Qty: 1 });
      setCart([...cart, { ...product, size: productSize, Qty: 1 }]);
      localStorage.setItem(user, JSON.stringify(cart));
      callingSuccessToast("Product Added", "");

      setTimeout(() => {
        navigate("/cart");
      }, 1);
    }
  }

  function handleAddToCart() {
    let productExists = false;

    if (user) {
      productExists = cart.some((item) => item.id == product.id);
    }

    if (!user) {
      callingErrorToast("Login required!", "Please Login first.");
    } else if (!productSize) {
      callingErrorToast(
        "Product size not selected!",
        "Please select the product size and then try adding to cart."
      );
    } else if (productExists) {
      callingErrorToast(
        "Product Already in Cart!",
        "If you want to change the quantity of product go to cart."
      );
    } else {
      setCart([...cart, { ...product, size: productSize, Qty: 1 }]);
      // console.log(cart);
      localStorage.setItem(user, JSON.stringify(cart));
      callingSuccessToast("Product Added", "");
      updateInitialState();
      setTimeout(() => {
        navigate("/products");
      }, 1);
    }
  }

  // function handleA(product) {
  //   setCart([...cart, { ...product, Qty: 1, size: productSize }]);

  //   console.log(cart);
  // }

  const group = getRootProps();
  return (
    <Box
      w={{ base: "90%", lg: "80%", xl: "70%", "2xl": "70%" }}
      m={"auto"}
      mt={"4rem"}
      mb={"4rem"}
      bg={"white"}
      borderRadius="10px"
    >
      <Flex direction={{ base: "column", lg: "row", "2xl": "row" }}>
        <Box
          p={4}
          w={{ base: "100%", md: "100%", lg: "70%", xl: "50%", "2xl": "50%" }}
        >
          <Image
            w={{ base: "100%", lg: "90%", xl: "100%", "2xl": "80%" }}
            src={product?.image}
            m={"auto"}
            borderRadius="15px"
          />
        </Box>
        <Flex
          pr={{ "2xl": "40px" }}
          w={{ lg: "70%" }}
          direction={"column"}
          justify={{ lg: "" }}
          p={4}
          ml={{ xl: "20px" }}
        >
          <Heading fontSize={{ base: "2xl" }} fontWeight={500}>
            {product?.name}
          </Heading>
          <Text pt={{ base: "1" }} pb={{ base: "1" }} fontWeight={600}>
            Rating: {product?.rating}
          </Text>
          <Text
            pt={{ base: "1" }}
            pb={{ base: "1" }}
            fontWeight={600}
            color={"brand.100"}
          >
            Price: ₹ {product?.price}
          </Text>
          <Flex
            flexWrap={"wrap"}
            justify={"space-around"}
            w={"fit-content"}
            pt={{ base: "2" }}
            pb={{ base: "4" }}
            {...group}
          >
            {options.map((value, i) => {
              const radio = getRadioProps({ value });
              return (
                <Box key={i} mr={{ base: "3.3px", sm: "10px" }}>
                  <RadioCard key={value} {...radio}>
                    {value}
                  </RadioCard>
                </Box>
              );
            })}
          </Flex>
          <Box>
            <Button
              onClick={() => handleAddToCart(product)}
              pt={"1px"}
              fontWeight={500}
              _hover={{
                backgroundColor: "#333",
                color: "white",
              }}
              variant={"solid"}
              color={"white"}
              bg="#333"
              mr={4}
            >
              ADD TO CART
            </Button>
            <Button
              onClick={handleBuyNow}
              _hover={{
                backgroundColor: "brand.100",
                color: "white",
              }}
              bg={"brand.100"}
              color={"white"}
              variant={"solid"}
            >
              <Flex fontWeight={500} align={"center"} justify={"center"}>
                <i className="fa-solid fa-box-open"></i>
                <Text pt={"1px"} ml={2}>
                  BUY NOW
                </Text>
              </Flex>
            </Button>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default SingleProduct;

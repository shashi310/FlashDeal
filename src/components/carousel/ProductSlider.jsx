import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Button, Flex } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import "./ProductSlider.css";

const ProductSlider = () => {
  let url = `${process.env.REACT_APP_LOCAL_URL}`;
  let container = document.querySelector(".carousalContainer");

  const [productData, setProductsData] = useState([]);

  useEffect(() => {
    fetchAndRender();
  }, []);

  //   fetchAndRender();

  function getData() {
    return axios
      .get(`${url}/products`)
      .then((res) => res)
      .catch((err) => {
        console.log(err);
      });
  }

  async function fetchAndRender() {
    try {
      let data = await getData();
      // console.log(data.data, "slider");
      setProductsData(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleLeftSwipe() {
    let width = container.clientWidth;
    container.scrollLeft = container.scrollLeft - width;
  }

  function handleRightSwipe() {
    let width = container.clientWidth;
    container.scrollLeft = container.scrollLeft + width;
  }

  return (
    <Box position={"relative"}>
      <Box
        _hover={{
          backgroundColor: "RGBA(0, 0, 0, 0.48)",
          cursor: "pointer",
          color: "white",
        }}
        height={"50px"}
        width={"50px"}
        textAlign="center"
        fontSize={"3xl"}
        zIndex={2}
        top={"150px"}
        borderRadius="50%"
        position={"absolute"}
        onClick={handleLeftSwipe}
      >
        <ChevronLeftIcon position={"relative"} top={"0px"} />
      </Box>
      <Box
        _hover={{
          backgroundColor: "RGBA(0, 0, 0, 0.48)",
          cursor: "pointer",
          color: "white",
        }}
        fontSize={"3xl"}
        right={"0px"}
        top={"150px"}
        zIndex={2}
        height={"50px"}
        width={"50px"}
        borderRadius="50%"
        textAlign="center"
        position={"absolute"}
        onClick={handleRightSwipe}
      >
        <ChevronRightIcon position={"relative"} top={"0px"} />
      </Box>
      <Flex
        className="carousalContainer"
        gap={2}
        overflowX={"scroll"}
        position="relative"
        overflowY="hidden"
        w={"100%"}
      >
        {productData.map((item) => (
          <ProductCard key={item.id} data={item} />
        ))}
      </Flex>
    </Box>
  );
};

export default ProductSlider;

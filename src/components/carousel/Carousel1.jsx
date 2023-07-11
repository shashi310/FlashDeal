import React from "react";
import { Box } from "@chakra-ui/react";
import ImageSlider from "./ImageSlider";
import image1 from "../images/snapdeal-carousal-1.jpeg";
import image2 from "../images/snapdeal-carousal-2.jpeg";
import image3 from "../images/snapdeal-carousal-3.jpeg";
import image4 from "../images/snapdeal-carousal-4.jpeg";

const Carousel1 = () => {
  const slides = [
    {
      //   url: "https://www.adgully.com/img/800/202104/snapdeal-campaign-2.jpeg",
      url: image1,
    },
    {
      url: image2,
    },
    {
      url: image3,
    },
    {
      url: image4,
    },
  ];

  return (
    <Box
      m={{ base: "auto", lg: "0" }}
      mt={{ base: 3, lg: 0 }}
      h={{ base: "200px", md: "300px", lg: "400px" }}
      w={{ base: "96%", lg: "100%" }}
    >
      <ImageSlider slides={slides} />
    </Box>
  );
};

export default Carousel1;

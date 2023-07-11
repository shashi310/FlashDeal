import React, { useEffect, useContext } from "react";
import "../App.css";
import Carousel1 from "../components/carousel/Carousel1";
import image4 from "../components/images/snapdeal-carousal-40.jpeg";
import image5 from "../components/images/ad1.png";
import image6 from "../components/images/ad2.png";
import image7 from "../components/images/ad3.png";
import image8 from "../components/images/ad4.png";
import image9 from "../components/images/ad5.png";
import image10 from "../components/images/ad6.png";
import { Box, Flex, Grid, GridItem, Image } from "@chakra-ui/react";
import Carousal2 from "../components/carousel/Carousal2";

const Landing = () => {
  return (
    <Box>
      <Flex justify={"center"} align="center" m={2}>
        <Box
          mr={{ base: 0, xl: 3 }}
          w={{ base: 0, lg: 0, xl: "54%", "2xl": "39%" }}
        >
          <Image borderRadius={"10px"} src={image4} />
        </Box>
        <Carousel1 />
      </Flex>
      <Box m={3}>
        <Image src={image5} />
      </Box>
      <Box>
        <Carousal2 />
      </Box>
      <Box
        borderBottom={"1px solid #d6d6d6"}
        display={{ base: "none", xl: "block" }}
        m={"auto"}
        mt={3}
        mb={3}
      >
        <Image src={image6} />
      </Box>
      <Box display={{ base: "block", xl: "none" }} m={6}>
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(2, 1fr)",
          }}
          gap={4}
        >
          <GridItem border={"1px solid #d6d6d6"} borderRadius={5}>
            <Image src={image7} />
          </GridItem>
          <GridItem border={"1px solid #d6d6d6"} borderRadius={5}>
            <Image src={image8} />
          </GridItem>
          <GridItem border={"1px solid #d6d6d6"} borderRadius={5}>
            <Image src={image9} />
          </GridItem>
          <GridItem border={"1px solid #d6d6d6"} borderRadius={5}>
            <Image src={image10} />
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
};

export default Landing;
// w={{ "2xl": "80%" }}

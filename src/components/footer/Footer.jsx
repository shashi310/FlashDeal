import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import footer1 from "../images/footer1.png";
import footer2 from "../images/footer2.png";

const Footer = () => {
  return (
    <Box>
      <Grid
        textAlign={"left"}
        templateAreas={{
          base: `"a b"
        "c d"
        "e e"`,
          md: `"a b c"
        "d e e"
        `,
          xl: `"a b c d e"
        `,
        }}
        gap={{ base: 2, "2xl": 4 }}
      >
        <GridItem area={"a"}>
          <Box>
            <Text pb={4}>POLICY INFO</Text>
            <Box color={"RGBA(0, 0, 0, 0.36)"}>
              <Text fontSize={"small"}>Privacy Policy</Text>
              <Text fontSize={"small"}>Terms of Sale</Text>
              <Text fontSize={"small"}> Terms of Use</Text>
              <Text fontSize={"small"}>Report Abuse & Takedown Policy</Text>
              <Text fontSize={"small"}>FAQ</Text>
            </Box>
          </Box>
        </GridItem>
        <GridItem area={"b"}>
          <Box>
            <Text pb={4}>COMPANY</Text>
            <Box color={"RGBA(0, 0, 0, 0.36)"}>
              <Text fontSize={"small"}>Impact@Flashdeal</Text>
              <Text fontSize={"small"}>Careers</Text>
              <Text fontSize={"small"}> Blog</Text>
              <Text fontSize={"small"}>Sitemap</Text>
              <Text fontSize={"small"}>Contact Us</Text>
            </Box>
          </Box>
        </GridItem>
        <GridItem area={"c"}>
          <Box>
            <Text pb={4}>FLASHDEAL BUSINESS</Text>
            <Box color={"RGBA(0, 0, 0, 0.36)"}>
              <Text fontSize={"small"}>Shopping App</Text>
              <Text fontSize={"small"}>Sell on Flashdeal</Text>
              <Text fontSize={"small"}>Media Enquiries</Text>
            </Box>
          </Box>
        </GridItem>
        <GridItem area={"d"}>
          <Box>
            <Text pb={4}>POPULAR LINKS</Text>
            <Box color={"RGBA(0, 0, 0, 0.36)"}>
              <Text fontSize={"small"}>Lehenga</Text>
              <Text fontSize={"small"}>Kid's Clothing</Text>
              <Text fontSize={"small"}> Sarees</Text>
              <Text fontSize={"small"}>Winter Wear</Text>
            </Box>
          </Box>
        </GridItem>
        <GridItem area={"e"}>
          <Box>
            <Text pb={4}>SUBSCRIBE</Text>
            <Box>
              <Flex>
                <Input width={"70%"} />
                <Button
                  bg={"#333"}
                  _hover={{ backgroundColor: "#333" }}
                  color={"white"}
                  p={3}
                  fontSize={"xs"}
                >
                  SUBSCRIBE
                </Button>
              </Flex>
              <Text color={"RGBA(0, 0, 0, 0.36)"} fontSize={"small"}>
                Register now to get updates on promotions andcoupons
              </Text>
              <Text cursor={"pointer"} color={"black"} fontSize={"small"}>
                <Link to={"/adminLogin"}>Admin Access</Link>
              </Text>
            </Box>
          </Box>
        </GridItem>
      </Grid>
      <Box p={4}>
        <Flex
          direction={{ base: "column", md: "row" }}
          align={{ base: "center", md: "center" }}
          justify={{ base: "center", md: "space-around" }}
        >
          <Box>
            <Image w={"80%"} src={footer1} />
          </Box>
          <Box>
            <Image w={"80%"} src={footer2} />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Footer;

import { Button, Flex, Input, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { searchContext } from "../../context/SearchContext";

const SearchInput = () => {
  const { handleSearchString, handleOnSearchBtn } = useContext(searchContext);
  const location = useLocation();

  return (
    <Flex w={{ md: "100%" }} justify={"space-between"}>
      {location.pathname != "/products" ? (
        <Link to={"/products"}>
          <Input
            onChange={(e) => {
              handleSearchString(e.target.value);
            }}
            w={{ base: "100%", lg: "25rem", "2xl": "50rem" }}
            color="black"
            borderRightRadius={"0"}
            bg={"white"}
          />
        </Link>
      ) : (
        <Input
          onChange={(e) => {
            handleSearchString(e.target.value);
          }}
          w={{ base: "100%", lg: "25rem", "2xl": "50rem" }}
          color="black"
          borderRightRadius={"0"}
          bg={"white"}
        />
      )}
      <Button
        onClick={() => {
          handleOnSearchBtn();
        }}
        fontWeight={400}
        pl={{ md: 5 }}
        pr={{ md: 5 }}
        borderLeftRadius={"0"}
        _hover={{ background: "#333" }}
        bg={"#333"}
        variant="solid"
      >
        <i className="fa-solid fa-magnifying-glass"></i>{" "}
        <Text ml={2}>Search</Text>
      </Button>
    </Flex>
  );
};

export default SearchInput;

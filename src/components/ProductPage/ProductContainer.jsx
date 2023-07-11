import { Box, Center, Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import ProductCard from "./ProductCard";

const ProductContainer = ({ product }) => {
  return (
    <Box p={4}>
      {product.length > 0 ? (
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
            "2xl": "repeat(5, 1fr)",
          }}
          gap={6}
        >
          {product.map((item) => {
            return (
              <GridItem key={item.id}>
                <ProductCard item={item} />
              </GridItem>
            );
          })}
        </Grid>
      ) : (
        <Center>
          {" "}
          <Box>No Products Found</Box>
        </Center>
      )}
    </Box>
  );
};

export default ProductContainer;

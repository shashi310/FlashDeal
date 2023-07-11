import { Box, Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import Product from "./Product";

const ProductsContainer = ({ productsData, handleEdit, handleDelete }) => {
  return (
    <Box w={"95%"} m="auto" mb={6}>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
          xl: "repeat(4, 1fr)",
          "2xl": "repeat(5, 1fr)",
        }}
        gap={{
          base: 2,
          md: 3,
          lg: 4,
          xl: 4,
          "2xl": 4,
        }}
      >
        {productsData.map((product) => {
          return (
            <GridItem key={product.id}>
              <Product
                {...product}
                data={product}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            </GridItem>
          );
        })}
      </Grid>
    </Box>
  );
};

export default ProductsContainer;

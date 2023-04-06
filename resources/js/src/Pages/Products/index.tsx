import React from "react";
import ProductCard from "../../Components/ProductCard";
import { Flex, Grid, useBreakpointValue } from "@chakra-ui/react";
import { CartContext } from "../../Contexts/CartContext";

const ProductsPage: React.FC = () => {
  const { products } = React.useContext(CartContext);
  const gridTemplateColumns = useBreakpointValue({
    base: 'repeat(1, 1fr)',
    sm: 'repeat(2, 1fr)',
    md: 'repeat(3, 1fr)',
    lg: 'repeat(4, 1fr)',
    xl: 'repeat(5, 1fr)',
  })
  return <Grid templateColumns={gridTemplateColumns} gap={2}>
    {products.map(product => (
      <Flex key={product.id} justifyContent={'center'}>
        <ProductCard {...product}/>
      </Flex>
    ))}
  </Grid>
}

export default ProductsPage
import React from "react";
import ProductCard from "../../Components/ProductCard";
import { Flex } from "@chakra-ui/react";
import { CartContext } from "../../Contexts/CartContext";

const ProductsPage: React.FC = () => {
  const { products } = React.useContext(CartContext);
  return <Flex gap={5}>
    {products.map(product => <ProductCard key={product.id} {...product}/>)}
  </Flex>
}

export default ProductsPage
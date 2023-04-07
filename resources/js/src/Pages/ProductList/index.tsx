import React from "react";
import ProductCard from "../../Components/ProductCard";
import { Flex, Grid, HStack, IconButton, Text, useBreakpointValue, VStack } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import { CartContext } from "../../Contexts/CartContext";
import { useNavigate } from "react-router-dom";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";

const ProductList: React.FC = () => {
  const navigate = useNavigate();
  const { products } = React.useContext(CartContext);
  const gridTemplateColumns = useBreakpointValue({
    base: 'repeat(1, 1fr)',
    sm: 'repeat(2, 1fr)',
    md: 'repeat(3, 1fr)',
    lg: 'repeat(4, 1fr)',
    xl: 'repeat(5, 1fr)',
  })
  return <VStack alignItems={'start'} gap={3} width={'100%'}>
    <HStack width={'100%'} justifyContent={'space-between'} py={1}>
      <Text fontSize={'2xl'} fontWeight={'bold'}>Products</Text>
      <IconButton
        aria-label={'create'}
        icon={<Icon icon={'mdi:add'} width={20} height={20}/>}
        size={'sm'}
        onClick={() => {
          navigate('/products/create')
        }}
      />
    </HStack>
    <CustomBreadcrumb crumbs={[
      {
        label: 'Products',
        path: '/products',
      },
    ]}/>
    <Grid templateColumns={gridTemplateColumns} gap={2} width={'100%'}>
      {products.map(product => (
        <Flex key={product.id} justifyContent={'center'}>
          <ProductCard {...product}/>
        </Flex>
      ))}
    </Grid>
  </VStack>
}

export default ProductList
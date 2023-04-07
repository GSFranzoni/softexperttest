import React from "react";
import ProductCard from "../../Components/ProductCard";
import {
  Alert,
  CircularProgress,
  Flex,
  Grid,
  HStack,
  IconButton,
  Text,
  useBreakpointValue,
  VStack
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import { CartContext } from "../../Contexts/CartContext";
import { useNavigate } from "react-router-dom";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";

const ProductList: React.FC = () => {
  const navigate = useNavigate();
  const { products, isFetching } = React.useContext(CartContext);
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
    {isFetching && <CircularProgress isIndeterminate color={'green.200'}/>}
    {!isFetching && products.length === 0 && (
      <Alert status={'info'} gap={3} width={'100%'}>
        <Icon icon={'mdi:information'} width={20} height={20}/>
        <Text fontSize={'sm'}>No products found</Text>
      </Alert>
    )}
    <Grid templateColumns={gridTemplateColumns} width={'100%'}>
      {products.map(product => (
        <Flex key={product.id} justifyContent={'center'}>
          <ProductCard {...product}/>
        </Flex>
      ))}
    </Grid>
  </VStack>
}

export default ProductList
import { Flex, HStack, Text, useToast, VStack } from "@chakra-ui/react";
import React from "react";
import ProductForm from "../../Components/ProductForm";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../../Services/Products";

const ProductCreatePage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const queryClient = useQueryClient();
  const { mutate } = useMutation(createProduct, {
    onSuccess: async () => {
      toast({
        title: 'Product created',
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
      await queryClient.invalidateQueries({
        queryKey: [ 'products' ]
      })
      navigate('/products')
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    }
  })
  return (
    <VStack justifyContent={'start'} gap={2} width={'100%'}>
      <HStack width={'100%'} justifyContent={'space-between'} py={1}>
        <Text fontSize={'2xl'} fontWeight={'bold'}>Create Product</Text>
      </HStack>
      <Flex width={'100%'} justifyContent={'start'}>
        <CustomBreadcrumb crumbs={[
          {
            label: 'Products',
            path: '/products',
          },
          {
            label: 'Create',
            path: '/products/create',
          }
        ]}/>
      </Flex>
      <ProductForm defaultValues={{
        name: '',
        price: 0,
        description: '',
      }} onSubmit={mutate} onCancel={() => {
        navigate('/products')
      }}/>
    </VStack>
  )
}

export default ProductCreatePage
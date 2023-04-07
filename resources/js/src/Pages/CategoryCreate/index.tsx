import { Flex, HStack, Text, useToast, VStack } from "@chakra-ui/react";
import React from "react";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../../Services/Products";
import CategoryForm from "../../Components/CategoryForm";

const CategoryCreatePage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const queryClient = useQueryClient();
  const { mutate } = useMutation(createProduct, {
    onSuccess: async () => {
      toast({
        title: 'Category created',
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
      await queryClient.invalidateQueries({
        queryKey: [ 'categories' ]
      })
      navigate('/categories')
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
        <Text fontSize={'2xl'} fontWeight={'bold'}>Create Category</Text>
      </HStack>
      <Flex width={'100%'} justifyContent={'start'}>
        <CustomBreadcrumb crumbs={[
          {
            label: 'Categories',
            path: '/categories',
          },
          {
            label: 'Create',
            path: '/categories/create',
          }
        ]}/>
      </Flex>
      <CategoryForm defaultValues={{
        description: '',
      }} onSubmit={mutate} onCancel={() => {
        navigate('/categories')
      }}/>
    </VStack>
  )
}

export default CategoryCreatePage
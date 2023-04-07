import { Flex, HStack, Text, useToast, VStack } from "@chakra-ui/react";
import React from "react";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import TaxForm from "../../Components/TaxForm";
import { createTax } from "../../Services/Taxes";

const TaxCreatePage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const queryClient = useQueryClient();
  const { mutate } = useMutation(createTax, {
    onSuccess: async () => {
      toast({
        title: 'Tax created',
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
      await queryClient.invalidateQueries({
        queryKey: [ 'taxes' ]
      })
      navigate('/taxes')
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
        <Text fontSize={'2xl'} fontWeight={'bold'}>Create Tax</Text>
      </HStack>
      <Flex width={'100%'} justifyContent={'start'}>
        <CustomBreadcrumb crumbs={[
          {
            label: 'Taxes',
            path: '/taxes',
          },
          {
            label: 'Create',
            path: '/taxes/create',
          }
        ]}/>
      </Flex>
      <TaxForm defaultValues={{
        description: '',
      }} onSubmit={mutate} onCancel={() => {
        navigate('/taxes')
      }}/>
    </VStack>
  )
}

export default TaxCreatePage
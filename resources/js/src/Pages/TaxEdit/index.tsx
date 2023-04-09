import { CircularProgress, Flex, HStack, Text, useToast, VStack } from "@chakra-ui/react";
import React from "react";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import TaxForm from "../../Components/TaxForm";
import { getTax, updateTax } from "../../Services/Taxes";
import { FormScope } from "../../Types";

const TaxEditPage = () => {
  const id = useParams().id;
  const navigate = useNavigate();
  const toast = useToast();
  const queryClient = useQueryClient();
  const { data: tax, isLoading } = useQuery([ 'taxes', id ], () => getTax(parseInt(id as string)), {
    enabled: !!id,
  })
  const { mutate } = useMutation(updateTax, {
    onSuccess: async () => {
      toast({
        title: 'Tax updated',
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
            label: 'Edit',
            path: `/taxes/${id}/edit`,
          }
        ]}/>
      </Flex>
      {isLoading ? (
        <CircularProgress isIndeterminate/>
      ) : (
        <TaxForm
          defaultValues={{
            ...tax,
            percent: tax && tax.percent * 100,
          }}
          onSubmit={mutate}
          onCancel={() => {
            navigate('/taxes')
          }}
          scope={FormScope.EDIT}
        />
      )}
    </VStack>
  )
}

export default TaxEditPage
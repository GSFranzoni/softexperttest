import { CircularProgress, Flex, HStack, Text, useToast, VStack } from "@chakra-ui/react";
import React from "react";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import UserForm from "../../Components/UserForm";
import { FormScope } from "../../Types";
import { register } from "../../Services/Auth";

const UserCreatePage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const queryClient = useQueryClient();
  const { mutate: create, isLoading: isCreating } = useMutation(register, {
    onSuccess: async () => {
      toast({
        title: 'User created',
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
      await queryClient.invalidateQueries({
        queryKey: [ 'users' ]
      })
      navigate('/users')
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
      <HStack width={'100%'} justifyContent={'start'} py={1} gap={2}>
        <Text fontSize={'2xl'} fontWeight={'bold'}>Create User</Text>
        {isCreating && <CircularProgress isIndeterminate size={'20px'} color={'whatsapp.200'}/>}
      </HStack>
      <Flex width={'100%'} justifyContent={'start'}>
        <CustomBreadcrumb crumbs={[
          {
            label: 'Users',
            path: '/users',
          },
          {
            label: 'Create',
            path: '/users/create',
          }
        ]}/>
      </Flex>
      <UserForm
        defaultValues={{}}
        onSubmit={create}
        onCancel={() => {
          navigate('/users')
        }}
        scope={FormScope.CREATE}
        isLoading={isCreating}
      />
    </VStack>
  )
}

export default UserCreatePage
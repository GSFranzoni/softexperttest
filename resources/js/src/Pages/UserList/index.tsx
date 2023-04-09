import { CircularProgress, HStack, IconButton, Text, useToast, VStack } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import React from "react";
import { useNavigate } from "react-router-dom";
import UserGrid from "../../Components/UserGrid";
import { useConfirmation } from "../../Hooks/Confirmation/useConfirmation";
import { User } from "../../Types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../../Services/Users";

const UserList = () => {
  const navigate = useNavigate();

  const toast = useToast()

  const queryClient = useQueryClient()

  const { mutateAsync: deleteUserMutate, isLoading: isDeleting } = useMutation(deleteUser, {
    onSuccess: async () => {
      toast({
        title: 'User deleted',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      await queryClient.invalidateQueries([ 'users' ])
    },
    onError: (error: any) => {
      toast({
        title: error.response.data.error,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  })

  const { confirm, ConfirmDialog } = useConfirmation<User>({
    onConfirm: deleteUserMutate,
  })

  return (
    <VStack alignItems={'start'} gap={3} width={'100%'}>
      <HStack width={'100%'} justifyContent={'space-between'} py={1}>
        <HStack alignItems={'center'} gap={2}>
          <Text fontSize={'2xl'} fontWeight={'bold'}>Users</Text>
          {isDeleting && <CircularProgress isIndeterminate size={'20px'} color={'whatsapp.200'}/>}
        </HStack>
        <IconButton
          aria-label={'create'}
          icon={<Icon icon={'mdi:add'} width={20} height={20}/>}
          size={'sm'}
          onClick={() => {
            navigate('/users/create')
          }}
        />
      </HStack>
      <CustomBreadcrumb crumbs={[
        {
          label: 'Users',
          path: '/users',
        },
      ]}/>
      <UserGrid
        onUserClicked={(user) => {
          navigate(`/users/${user.id}`)
        }}
        onDeleteClicked={confirm}
      />
      <ConfirmDialog/>
    </VStack>
  )
}

export default UserList
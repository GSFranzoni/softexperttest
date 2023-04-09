import { HStack, IconButton, Progress, Text, VStack } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormScope } from "../../Types";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../Services/Users";
import UserForm from "../../Components/UserForm";

const UserView = () => {
  const navigate = useNavigate();
  const id = useParams().id as string
  const { data: user, isLoading } = useQuery([ 'users', id ], () => getUser({ id: parseInt(id) }), {
    enabled: !!id,
  })
  return (
    <VStack alignItems={'start'} gap={3} width={'100%'}>
      <HStack width={'100%'} justifyContent={'space-between'} py={1}>
        <Text fontSize={'2xl'} fontWeight={'bold'}>Users</Text>
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
        {
          label: 'View',
          path: '/users/{id}',
        }
      ]}/>
      {isLoading && <Progress width={'100%'} isIndeterminate/>}
      {user && (
        <UserForm
          scope={FormScope.VIEW}
          defaultValues={user}
          onSubmit={() => {
          }}
          onCancel={() => navigate('/users')}
        />
      )}
    </VStack>
  )
}

export default UserView
import { Button, HStack, IconButton, Progress, Text, VStack } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPurchase } from "../../Services/Purchases";
import PurchaseResume from "../../Components/PurchaseResume";

const PurchaseView = () => {
  const navigate = useNavigate();
  const id = useParams().id
  const {
    data: purchase,
    isLoading
  } = useQuery([ 'purchase', id ], () => getPurchase({ id: parseInt(id as string) }), {
    enabled: !!id,
  })
  return (
    <VStack alignItems={'start'} gap={3} width={'100%'}>
      <HStack width={'100%'} justifyContent={'space-between'} py={1}>
        <Text fontSize={'2xl'} fontWeight={'bold'}>Purchase</Text>
        <IconButton
          aria-label={'create'}
          icon={<Icon icon={'mdi:add'} width={20} height={20}/>}
          size={'sm'}
          onClick={() => {
            navigate('/purchases/create')
          }}
        />
      </HStack>
      <CustomBreadcrumb crumbs={[
        {
          label: 'Purchases',
          path: '/purchases',
        },
        {
          label: 'View',
          path: '/purchases/' + id,
        }
      ]}/>
      {isLoading && <Progress width={'100%'} isIndeterminate/>}
      {!!purchase && (
        <PurchaseResume purchase={purchase}/>
      )}
      <HStack width={'100%'} justifyContent={'end'}>
        <Button onClick={() => {
          navigate('/purchases')
        }}>
          Back
        </Button>
      </HStack>
    </VStack>
  )
}

export default PurchaseView
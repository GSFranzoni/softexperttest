import { HStack, Text, VStack } from "@chakra-ui/react";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import React from "react";
import { useNavigate } from "react-router-dom";
import PurchaseGrid from "../../Components/PurchaseGrid";

const PurchaseList = () => {
  const navigate = useNavigate();
  return (
    <VStack alignItems={'start'} gap={3} width={'100%'}>
      <HStack width={'100%'} justifyContent={'space-between'} py={1}>
        <Text fontSize={'2xl'} fontWeight={'bold'}>Purchases</Text>
      </HStack>
      <CustomBreadcrumb crumbs={[
        {
          label: 'Purchases',
          path: '/purchases',
        },
      ]}/>
      <PurchaseGrid onPurchaseClick={console.log}/>
    </VStack>
  )
}

export default PurchaseList
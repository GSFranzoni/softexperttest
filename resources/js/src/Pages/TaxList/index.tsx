import { HStack, IconButton, Progress, Text, VStack } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import TaxGrid from "../../Components/TaxGrid";
import { getTaxes } from "../../Services/Taxes";

const TaxList = () => {
  const navigate = useNavigate();
  const { data: taxes, isLoading } = useQuery([ 'taxes' ], getTaxes, {
    refetchOnWindowFocus: false,
    initialData: [],
  })
  return (
    <VStack alignItems={'start'} gap={3} width={'100%'}>
      <HStack width={'100%'} justifyContent={'space-between'} py={1}>
        <Text fontSize={'2xl'} fontWeight={'bold'}>Taxes</Text>
        <IconButton
          aria-label={'create'}
          icon={<Icon icon={'mdi:add'} width={20} height={20}/>}
          size={'sm'}
          onClick={() => {
            navigate('/taxes/create')
          }}
        />
      </HStack>
      <CustomBreadcrumb crumbs={[
        {
          label: 'Taxes',
          path: '/taxes',
        },
      ]}/>
      {isLoading && <Progress size={'xs'} isIndeterminate/>}
      <TaxGrid taxes={taxes} isFetching={isLoading} onTaxClick={console.log}/>
    </VStack>
  )
}

export default TaxList
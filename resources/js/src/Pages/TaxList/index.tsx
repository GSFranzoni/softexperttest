import { HStack, IconButton, Text, VStack } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import React from "react";
import { useNavigate } from "react-router-dom";
import TaxGrid from "../../Components/TaxGrid";
import { FormScope } from "../../Types";

const TaxList = () => {
  const navigate = useNavigate();
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
      <TaxGrid onTaxClick={(tax, scope) => {
        const actions = {
          [FormScope.VIEW]: () => {
            navigate(`/taxes/${tax.id}`)
          },
          [FormScope.EDIT]: () => {
            navigate(`/taxes/${tax.id}/edit`)
          },
          [FormScope.DELETE]: () => {
          }
        }
        actions[scope.toString() as keyof typeof actions]()
      }}/>
    </VStack>
  )
}

export default TaxList
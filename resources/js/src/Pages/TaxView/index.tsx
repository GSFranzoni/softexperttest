import { HStack, IconButton, Progress, Text, VStack } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import TaxForm from "../../Components/TaxForm";
import { FormScope } from "../../Types";
import { useQuery } from "@tanstack/react-query";
import { getTax } from "../../Services/Taxes";

const TaxView = () => {
  const navigate = useNavigate();
  const id = useParams().id
  const { data: tax, isLoading } = useQuery([ 'taxes', id ], () => getTax(parseInt(id as string)), {
    enabled: !!id,
  })
  console.log(tax)
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
        {
          label: 'View',
          path: '/taxes/{id}',
        }
      ]}/>
      {isLoading && <Progress width={'100%'} isIndeterminate/>}
      {tax && (
        <TaxForm
          scope={FormScope.VIEW}
          defaultValues={{
            id: tax.id,
            description: tax.description,
            percent: tax.percent * 100,
          }}
          onSubmit={() => {
          }}
          onCancel={() => navigate('/taxes')}
        />
      )}
    </VStack>
  )
}

export default TaxView
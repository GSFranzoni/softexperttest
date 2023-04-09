import { HStack, IconButton, Text, VStack } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import React from "react";
import { useNavigate } from "react-router-dom";
import CategoryGrid from "../../Components/CategoryGrid";

const CategoryList = () => {
  const navigate = useNavigate();
  return (
    <VStack alignItems={'start'} gap={3} width={'100%'}>
      <HStack width={'100%'} justifyContent={'space-between'} py={1}>
        <Text fontSize={'2xl'} fontWeight={'bold'}>Categories</Text>
        <IconButton
          aria-label={'create'}
          icon={<Icon icon={'mdi:add'} width={20} height={20}/>}
          size={'sm'}
          onClick={() => {
            navigate('/categories/create')
          }}
        />
      </HStack>
      <CustomBreadcrumb crumbs={[
        {
          label: 'Categories',
          path: '/categories',
        },
      ]}/>
      <CategoryGrid onCategoryClick={() => {
      }}/>
    </VStack>
  )
}

export default CategoryList
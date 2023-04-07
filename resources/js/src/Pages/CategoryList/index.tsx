import { HStack, IconButton, Progress, Text, VStack } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import React from "react";
import { useNavigate } from "react-router-dom";
import CategoryGrid from "../../Components/CategoryGrid";
import { getCategories } from "../../Services/Categories";
import { useQuery } from "@tanstack/react-query";

const CategoryList = () => {
  const navigate = useNavigate();
  const { data: categories, isLoading } = useQuery([ 'categories' ], getCategories, {
    refetchOnWindowFocus: false,
    initialData: [],
  })
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
      {isLoading && <Progress size={'xs'} isIndeterminate/>}
      <CategoryGrid categories={categories} isFetching={isLoading} onCategoryClick={console.log}/>
    </VStack>
  )
}

export default CategoryList
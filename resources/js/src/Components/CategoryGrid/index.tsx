import { ProductCategory } from "../../Types";
import { Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../Services/Categories";

type CategoryGridProps = {
  onCategoryClick: (category: ProductCategory) => void;
}

const CategoryGrid = ({ onCategoryClick }: CategoryGridProps) => {
  const { data: categories, isFetching } = useQuery([ 'categories' ], getCategories, {
    refetchOnWindowFocus: false,
    initialData: [],
  })
  return (
    <TableContainer width={'100%'}>
      <Table variant={'simple'}>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Description</Th>
            <Th>Tax</Th>
            <Th>Percent</Th>
          </Tr>
        </Thead>
        <Tbody>
          {categories.map((category) => (
            <Tr key={category.id} onClick={() => onCategoryClick(category)}
                _hover={{ cursor: 'pointer', opacity: 0.8 }}>
              <Th>{category.id}</Th>
              <Th>{category.description}</Th>
              <Th>{category.tax.description}</Th>
              <Th>{Intl.NumberFormat('en-US', { style: 'percent' }).format(category.tax.percent)}</Th>
            </Tr>
          ))}
          {categories.length === 0 && (
            <Tr>
              <Th colSpan={4} textAlign={'center'}>
                {isFetching ? 'Loading...' : 'No categories found'}
              </Th>
            </Tr>
          )}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default CategoryGrid;
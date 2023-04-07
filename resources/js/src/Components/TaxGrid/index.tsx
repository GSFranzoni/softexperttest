import { ProductCategoryTax } from "../../Types";
import { Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getTaxes } from "../../Services/Taxes";

type TaxGridProps = {
  onTaxClick: (tax: ProductCategoryTax) => void;
}

const TaxGrid = ({ onTaxClick }: TaxGridProps) => {
  const { data: taxes, isFetching } = useQuery([ 'taxes' ], getTaxes, {
    refetchOnWindowFocus: false,
    initialData: [],
  })
  return (
    <TableContainer width={'100%'}>
      <Table variant={'striped'}>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Description</Th>
            <Th>Percent</Th>
          </Tr>
        </Thead>
        <Tbody>
          {taxes.map((tax) => (
            <Tr key={tax.id} onClick={() => onTaxClick(tax)}
                _hover={{ cursor: 'pointer', opacity: 0.8 }}>
              <Th>{tax.id}</Th>
              <Th>{tax.description}</Th>
              <Th>{Intl.NumberFormat('en-US', { style: 'percent' }).format(tax.percent)}</Th>
            </Tr>
          ))}
          {taxes.length === 0 && (
            <Tr>
              <Th colSpan={3} textAlign={'center'}>
                {isFetching ? 'Loading...' : 'No taxes found'}
              </Th>
            </Tr>
          )}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default TaxGrid;
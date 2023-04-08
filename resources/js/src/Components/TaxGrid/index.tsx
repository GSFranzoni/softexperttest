import { ProductCategoryTax } from "../../Types";
import { HStack, IconButton, Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getTaxes } from "../../Services/Taxes";
import { Icon } from "@iconify/react";

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
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {taxes.map((tax) => (
            <Tr key={tax.id} onClick={() => onTaxClick(tax)}
                _hover={{ cursor: 'pointer', opacity: 0.8 }}>
              <Th>{tax.id}</Th>
              <Th>{tax.description}</Th>
              <Th>{Intl.NumberFormat('en-US', { style: 'percent' }).format(tax.percent)}</Th>
              <Th>
                <HStack>
                  <IconButton
                    aria-label={'delete tax'}
                    icon={<Icon icon={'mdi:delete'} width={20} height={20}/>}
                    size={'sm'}
                    colorScheme={'red'}
                    variant={'link'}
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('delete tax')
                    }}
                  />
                </HStack>
              </Th>
            </Tr>
          ))}
          {taxes.length === 0 && (
            <Tr>
              <Th colSpan={4} textAlign={'center'}>
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
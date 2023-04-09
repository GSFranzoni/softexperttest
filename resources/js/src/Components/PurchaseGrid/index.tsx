import { FormScope, Purchase } from "../../Types";
import { Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { formatPrice } from "../../Utils/Money";
import { formatDate } from "../../Utils/Date";
import { getPurchases } from "../../Services/Purchases";

type PurchaseGridProps = {
  onPurchaseClick: (purchase: Purchase, scope: FormScope) => void
}

const PurchaseGrid = ({ onPurchaseClick }: PurchaseGridProps) => {
  const { data: purchases, isFetching } = useQuery([ 'purchases' ], getPurchases, {
    refetchOnWindowFocus: false,
    initialData: [],
  })
  return (
    <TableContainer width={'100%'}>
      <Table variant={'striped'}>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Total</Th>
            <Th>Tax</Th>
            <Th>Date</Th>
          </Tr>
        </Thead>
        <Tbody>
          {purchases.map((purchase) => (
            <Tr key={purchase.id} onClick={() => onPurchaseClick(purchase, FormScope.VIEW)}
                _hover={{ cursor: 'pointer', opacity: 0.8 }}>
              <Th>{purchase.id}</Th>
              <Th>{formatPrice(purchase.total)}</Th>
              <Th>{formatPrice(purchase.tax)}</Th>
              <Th>{formatDate(new Date(purchase.date))}</Th>
            </Tr>
          ))}
          {purchases.length === 0 && (
            <Tr>
              <Th colSpan={4} textAlign={'center'}>
                {isFetching ? 'Loading...' : 'No purchases found'}
              </Th>
            </Tr>
          )}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default PurchaseGrid;
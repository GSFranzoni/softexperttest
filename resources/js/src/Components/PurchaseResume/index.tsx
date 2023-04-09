import { Purchase } from "../../Types";
import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  HStack,
  IconButton,
  Image,
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  VStack
} from "@chakra-ui/react";
import { formatDate } from "../../Utils/Date";
import { formatPrice } from "../../Utils/Money";
import { Icon } from "@iconify/react";

type PurchaseResumeProps = {
  purchase: Purchase
}

const PurchaseResume: React.FC<PurchaseResumeProps> = ({ purchase: { id, date, tax, total, products } }) => {
  return (
    <Card width={'100%'} boxShadow={'2xl'}>
      <CardHeader>
        <HStack alignItems={'center'} justifyContent={'space-between'} width={'100%'} spacing={2}>
          <HStack alignItems={'center'}>
            <Text fontSize={'2xl'} fontWeight={'bold'}>Resume of purchase #{id}</Text>
          </HStack>
          <HStack alignItems={'center'} spacing={5}>
            <Text fontSize={'xs'} fontWeight={'semibold'} color={'gray.300'}>{formatDate(new Date(date))}</Text>
            <HStack alignItems={'center'} spacing={2}>
              <IconButton
                aria-label={'share'}
                size={'sm'}
                icon={<Icon icon={'mdi:share-variant'} width={20} height={20}/>}
              />
              <IconButton
                aria-label={'print'}
                size={'sm'}
                icon={<Icon icon={'mdi:printer'} width={20} height={20}/>}
              />
            </HStack>
          </HStack>
        </HStack>
      </CardHeader>
      <CardBody>
        <TableContainer width={'100%'}>
          <Table variant={'striped'}>
            <Thead>
              <Tr>
                <Th>Product</Th>
                <Th isNumeric>Price</Th>
                <Th isNumeric>Quantity</Th>
                <Th isNumeric>Tax</Th>
                <Th isNumeric>Total</Th>
              </Tr>
            </Thead>
            <Tbody>
              {products.map((product) => (
                <Tr key={product.id}>
                  <Th>
                    <HStack alignItems={'center'} spacing={2}>
                      <Image
                        src={'https://via.placeholder.com/50'}
                        alt={product.name}
                        width={'50px'}
                        height={'50px'}
                        objectFit={'cover'}
                        borderRadius={'md'}
                      />
                      <VStack alignItems={'start'} spacing={0}>
                        <Text fontSize={'md'} fontWeight={'bold'}>{product.name}</Text>
                        <Text fontSize={'2xs'}>{product.description}</Text>
                      </VStack>
                    </HStack>
                  </Th>
                  <Th isNumeric>{formatPrice(product.price)}</Th>
                  <Th isNumeric>{product.quantity}</Th>
                  <Th isNumeric color={'red.200'}>{formatPrice(product.tax || 0)}</Th>
                  <Th isNumeric>{formatPrice(product.total || 0)}</Th>
                </Tr>
              ))}
              <Tr borderTopWidth={2} borderTopColor={'gray.200'} borderTopStyle={'dotted'} fontWeight={'bold'}>
                <Th isNumeric colSpan={3} textAlign={'right'} fontSize={'xl'} pt={6}>Total</Th>
                <Th isNumeric color={'red.200'} fontSize={'xl'} pt={6}>{formatPrice(tax)}</Th>
                <Th isNumeric fontSize={'xl'} pt={6}>{formatPrice(total)}</Th>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </CardBody>
    </Card>
  )
}

export default PurchaseResume
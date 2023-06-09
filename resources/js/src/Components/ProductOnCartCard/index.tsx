import { Box, Card, CardProps, HStack, IconButton, Image, Text, VStack } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { formatPrice } from "../../Utils/Money";
import { Icon } from "@iconify/react";
import { PurchasedProduct } from "../../Types";

const ProductOnCartCard = ({ product, onRemove, onIncrease, onDecrease, ...props }: {
                             product: PurchasedProduct;
                             onRemove: () => void;
                             onIncrease: () => void;
                             onDecrease: () => void;
                           } & CardProps
) => {
  const formattedPrice = useMemo(() => formatPrice(product.price * product.quantity), [ product.price, product.quantity ]);
  const formattedTax = useMemo(() => formatPrice(product.price * product.quantity * product.category.tax.percent), [ product.price, product.quantity, product.category ]);
  return (
    <Card {...props}>
      <HStack>
        <Image src={product.image || 'https://via.placeholder.com/150'} alt={product.name} width={'80px'}
               borderRadius={'md'}/>
        <VStack alignItems={'start'} spacing={1} flex={1}>
          <Text fontSize={'xs'} color={'gray.500'}>{product.name}</Text>
          <HStack>
            <Text fontSize={'sm'} fontWeight={'bold'} color={'whatsapp.200'}>{formattedPrice}</Text>
            <Text fontSize={'2xs'} color={'gray.500'}>+ {formattedTax} tax</Text>
          </HStack>
          <HStack>
            <IconButton
              aria-label={'decrease'}
              size={'xs'}
              icon={<Icon icon={'ic:baseline-remove-circle'}/>}
              onClick={() => {
                if (product.quantity === 1) {
                  return onRemove()
                }
                return onDecrease()
              }}
            />
            <Text fontSize={'xs'} color={'gray.500'}>{product.quantity}</Text>
            <IconButton
              aria-label={'increase'}
              size={'xs'}
              icon={<Icon icon={'ic:baseline-add-circle'}/>}
              onClick={onIncrease}
              isDisabled={product.stock === product.quantity}
            />
          </HStack>
        </VStack>
        <Box pr={2}>
          <IconButton
            aria-label={'increase'}
            size={'xs'}
            colorScheme={'red'}
            icon={<Icon icon={'ion:trash-sharp'}/>}
            variant={'ghost'}
            onClick={onRemove}
          />
        </Box>
      </HStack>
    </Card>
  )
}


export default ProductOnCartCard;
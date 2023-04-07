import {
  Alert,
  AlertTitle,
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  IconButton,
  Stat,
  StatDownArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  VStack
} from "@chakra-ui/react"
import { useContext } from "react";
import { CartContext } from "../../Contexts/CartContext";
import ProductOnCartCard from "../ProductOnCartCard";
import { formatPrice } from "../../Utils/Money";
import { Icon } from "@iconify/react";

const CartDrawer = () => {
  const {
    showCartDrawer,
    onHideCartDrawer,
    productsInCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    total,
    tax,
    isEmpty,
    savePurchase,
    isCreatingPurchase
  } = useContext(CartContext)
  return (
    <Drawer
      isOpen={showCartDrawer}
      placement='right'
      onClose={onHideCartDrawer}
    >
      <DrawerOverlay/>
      <DrawerContent>
        <HStack alignItems={'center'}>
          <DrawerCloseButton size={'sm'}/>
          <DrawerHeader px={1} fontSize={'sm'} flex={1} color={'gray.300'}>
            Products in cart
          </DrawerHeader>
        </HStack>

        <DrawerBody px={3} borderBottomWidth={'1px'}>
          <VStack alignItems={'start'}>
            {productsInCart.map(product => (
              <ProductOnCartCard
                key={product.id}
                width={'100%'}
                product={product}
                onRemove={() => removeFromCart(product)}
                onIncrease={() => increaseQuantity(product)}
                onDecrease={() => decreaseQuantity(product)}
              />
            ))}
            {isEmpty && (
              <Alert status='error' variant={'left-accent'}>
                <Box px={2}>
                  <Icon icon={'mdi:cart-off'} width={20} height={20}/>
                </Box>
                <AlertTitle mr={2}> Your cart is empty!</AlertTitle>
              </Alert>
            )}
          </VStack>
        </DrawerBody>

        <DrawerFooter>
          <HStack alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
            <Stat>
              <StatLabel>
                Total
              </StatLabel>
              <StatNumber>
                {formatPrice(total)}
              </StatNumber>
              <StatHelpText>
                <StatDownArrow/> + {formatPrice(tax)} tax
              </StatHelpText>
            </Stat>
            <IconButton
              aria-label={'finish shopping'}
              colorScheme={'green'}
              variant={'solid'}
              icon={<Icon icon={'mdi:cart-arrow-right'}/>}
              isDisabled={isEmpty}
              isLoading={isCreatingPurchase}
              onClick={savePurchase}
            />
          </HStack>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default CartDrawer
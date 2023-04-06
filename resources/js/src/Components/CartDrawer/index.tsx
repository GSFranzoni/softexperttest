import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  VStack
} from "@chakra-ui/react"
import { useContext } from "react";
import { CartContext } from "../../Contexts/CartContext";
import ProductOnCartCard from "../ProductOnCartCard";

const CartDrawer = () => {
  const {
    showCartDrawer,
    onShowCartDrawer,
    onHideCartDrawer,
    productsInCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext)
  return (
    <Drawer
      isOpen={showCartDrawer}
      placement='right'
      onClose={onHideCartDrawer}
    >
      <DrawerOverlay/>
      <DrawerContent>
        <HStack>
          <DrawerCloseButton/>
          <DrawerHeader borderBottomWidth='1px' fontSize={'sm'} flex={1}>
            Products in cart
          </DrawerHeader>
        </HStack>

        <DrawerBody>
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
          </VStack>
        </DrawerBody>

        <DrawerFooter borderTopWidth='1px'>
          <Button variant='outline' mr={3} onClick={onHideCartDrawer}>
            Cancel
          </Button>
          <Button colorScheme='blue'>Confirm</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default CartDrawer
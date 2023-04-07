import React, { useContext, useMemo } from "react";
import { Button, Card, CardBody, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { formatPrice } from "../../Utils/Money";
import { CartContext } from "../../Contexts/CartContext";
import { Icon } from "@iconify/react";

export type ProductCardProps = {
  id: number;
  name: string;
  price: number;
  tax: number;
  description: string;
  image: string;
  stock: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
                                                   id,
                                                   name,
                                                   price,
                                                   tax,
                                                   description,
                                                   image,
                                                   stock,
                                                 }) => {
  const formattedPrice = useMemo(() => formatPrice(price), [ price ]);

  const formattedTax = useMemo(() => formatPrice(price * tax), [ price, tax ]);

  const inStock = useMemo(() => stock > 0, [ stock ]);

  const { addToCart } = useContext(CartContext);

  return <Card width={'100%'} boxShadow={'2xl'}>
    <Image src={image} alt={name}/>
    <CardBody>
      <VStack alignItems={'start'}>
        <Text fontSize={'lg'} fontWeight={'bold'}>{name}</Text>
        <Text fontSize={'xs'} color={
          'gray.500'
        }>{description}</Text>
        <HStack py={2} alignItems={'center'}>
          <Text fontSize={'4xl'} fontWeight={'bold'} color={
            inStock ? 'whatsapp.300' : 'red.100'
          }>{formattedPrice}</Text>
          <Text fontSize={'xs'} color={'gray.500'}>+ {formattedTax} tax</Text>
        </HStack>
        {inStock ? (
          <Text fontSize={'xs'} color={'whatsapp.100'}>{`In stock: only ${stock} left!`}</Text>
        ) : (
          <Text fontSize={'xs'} color={'red.100'}>Out of stock</Text>
        )}
      </VStack>
    </CardBody>
    <Button
      borderRadius={0}
      colorScheme={inStock ? 'whatsapp' : 'red'}
      isDisabled={!inStock}
      onClick={() => {
        addToCart({ id, name, price, tax, description, image, stock });
      }}
      leftIcon={
        <Icon icon={'ic:round-add-shopping-cart'} color={'black'}/>
      }
    >
      Add to cart
    </Button>
  </Card>
}

export default ProductCard
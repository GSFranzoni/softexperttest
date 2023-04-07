import React, { useContext, useMemo } from "react";
import { Button, Card, CardBody, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { formatPrice } from "../../Utils/Money";
import { CartContext } from "../../Contexts/CartContext";
import { Icon } from "@iconify/react";
import { Product } from "../../Types";

const ProductCard: React.FC<Product> = ({
                                          id,
                                          name,
                                          price,
                                          category,
                                          description,
                                          image,
                                          stock,
                                        }) => {
  const formattedPrice = useMemo(() => formatPrice(price), [ price ]);

  const formattedTax = useMemo(() => formatPrice(price * category.tax.percent), [ price, category ]);

  const inStock = useMemo(() => stock > 0, [ stock ]);

  const { addToCart } = useContext(CartContext);

  return <Card width={'100%'} boxShadow={'2xl'}>
    <Image src={image || 'https://via.placeholder.com/150'} alt={name} width={'100%'} height={'180px'}/>
    <CardBody>
      <VStack alignItems={'start'}>
        <Text fontSize={'lg'} fontWeight={'bold'}>{name}</Text>
        <Text fontSize={'xs'} color={
          'gray.500'
        }>{description}</Text>
        <HStack py={2} alignItems={'center'}>
          <Text fontSize={'3xl'} fontWeight={'bold'} color={
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
        addToCart({ id, name, price, category, description, image, stock });
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
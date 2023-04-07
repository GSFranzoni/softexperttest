import { ProductCardProps } from "../../Components/ProductCard";
import React, { createContext, useCallback, useEffect } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { getProducts } from "../../Services/Products";

const fakeProducts: ProductCardProps[] = [
  {
    id: 1,
    name: 'Product 1',
    price: 10,
    tax: 0.1,
    description: 'This is a product',
    image: 'https://via.placeholder.com/150',
    stock: 0,
  },
  {
    id: 2,
    name: 'Product 2',
    price: 20,
    tax: 0.1,
    description: 'This is a product',
    image: 'https://via.placeholder.com/150',
    stock: 10,
  },
  {
    id: 3,
    name: 'Product 3',
    price: 30,
    tax: 0.1,
    description: 'This is a product',
    image: 'https://via.placeholder.com/150',
    stock: 10,
  }
]

export type ProductOnCard = ProductCardProps & {
  quantity: number;
}

type CartContextData = {
  products: ProductCardProps[];
  productsInCart: ProductOnCard[];
  addToCart: (product: ProductCardProps) => void;
  removeFromCart: (product: ProductCardProps) => void;
  increaseQuantity: (product: ProductCardProps) => void;
  decreaseQuantity: (product: ProductCardProps) => void;
  total: number;
  tax: number;
  itemsCount: number;
  showCartDrawer: boolean;
  onShowCartDrawer: () => void;
  onHideCartDrawer: () => void;
  isEmpty: boolean;
}

export const CartContext = createContext<CartContextData>({} as CartContextData);

const CartProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { isOpen: showCartDrawer, onOpen: onShowCartDrawer, onClose: onHideCartDrawer } = useDisclosure();

  const [ products, setProducts ] = React.useState<ProductCardProps[]>(fakeProducts);

  const [ productsInCart, setProductsInCart ] = React.useState<ProductOnCard[]>([]);

  const total = React.useMemo(() => {
    return productsInCart.reduce((acc, product) => acc + product.price * product.quantity, 0);
  }, [ productsInCart ]);

  const tax = React.useMemo(() => {
    return productsInCart.reduce((acc, product) => acc + product.price * product.tax * product.quantity, 0);
  }, [ productsInCart ]);

  const itemsCount = React.useMemo(() => {
    return productsInCart.reduce((acc, product) => acc + product.quantity, 0);
  }, [ productsInCart ]);

  const isEmpty = React.useMemo(() => {
    return productsInCart.length === 0;
  }, [ productsInCart ]);

  const validateStock = useCallback(({ id, diff }: { id: number, diff: number }) => {
    const product = products.find(p => p.id === id);
    if (!product) {
      return false;
    }
    const productOnCard = productsInCart.find(p => p.id === id);
    if (!productOnCard) {
      return false;
    }
    return productOnCard.quantity + diff >= 0 && productOnCard.quantity + diff <= product.stock;
  }, [ products, productsInCart ]);

  const changeQuantity = useCallback(({ id, diff }: { id: number, diff: number }) => {
    if (!validateStock({ id, diff })) {
      return; // Todo: Show error
    }
    setProductsInCart(productsInCart.map(product => ({
      ...product,
      quantity: product.id === id ? product.quantity + diff : product.quantity,
    })));
  }, [ products, productsInCart ]);

  const increaseQuantity = ({ id }: { id: number }) => changeQuantity({ id, diff: 1 });

  const decreaseQuantity = ({ id }: { id: number }) => changeQuantity({ id, diff: -1 });

  const addToCart = useCallback((product: ProductCardProps) => {
    const productOnCard = productsInCart.find(p => p.id === product.id);
    onShowCartDrawer();
    if (productOnCard) {
      return increaseQuantity({ id: product.id });
    }
    setProductsInCart([
      ...productsInCart,
      {
        ...product,
        quantity: 1,
      }
    ]);
  }, [ products, productsInCart ]);

  const removeFromCart = (product: ProductCardProps) => {
    setProductsInCart(productsInCart.filter(p => p.id !== product.id));
  };

  useEffect(() => {
    getProducts({}).then(console.log);
  }, []);

  return (
    <CartContext.Provider value={{
      products,
      productsInCart,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      total,
      tax,
      showCartDrawer,
      onShowCartDrawer,
      onHideCartDrawer,
      itemsCount,
      isEmpty,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
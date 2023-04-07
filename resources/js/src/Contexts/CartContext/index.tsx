import React, { createContext, useCallback } from "react";
import { useDisclosure, useToast } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProducts } from "../../Services/Products";
import { Product, PurchasedProduct } from "../../Types";
import { createPurchase } from "../../Services/Purchases";

type CartContextData = {
  products: Product[];
  productsInCart: PurchasedProduct[];
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  increaseQuantity: (product: Product) => void;
  decreaseQuantity: (product: Product) => void;
  total: number;
  tax: number;
  itemsCount: number;
  showCartDrawer: boolean;
  onShowCartDrawer: () => void;
  onHideCartDrawer: () => void;
  isEmpty: boolean;
  isFetching: boolean;
  savePurchase: () => void;
  isCreatingPurchase: boolean;
}

export const CartContext = createContext<CartContextData>({} as CartContextData);

const CartProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { isOpen: showCartDrawer, onOpen: onShowCartDrawer, onClose: onHideCartDrawer } = useDisclosure();

  const { data: { products, pages }, isFetching } = useQuery<any>([ 'products' ], () => getProducts({}), {
    initialData: {
      products: [],
    }
  });

  const [ productsInCart, setProductsInCart ] = React.useState<PurchasedProduct[]>([]);

  const total = React.useMemo(() => {
    return productsInCart.reduce((acc, product) => acc + product.price * product.quantity, 0);
  }, [ productsInCart ]);

  const tax = React.useMemo(() => {
    return productsInCart.reduce((acc, product) => acc + product.price * product.category.tax.percent * product.quantity, 0);
  }, [ productsInCart ]);

  const itemsCount = React.useMemo(() => {
    return productsInCart.reduce((acc, product) => acc + product.quantity, 0);
  }, [ productsInCart ]);

  const isEmpty = React.useMemo(() => {
    return productsInCart.length === 0;
  }, [ productsInCart ]);

  const validateStock = useCallback(({ id, diff }: { id: number, diff: number }) => {
    const product = products.find((p: any) => p.id === id);
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

  const addToCart = useCallback((product: Product) => {
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

  const removeFromCart = (product: Product) => {
    setProductsInCart(productsInCart.filter(p => p.id !== product.id));
  };

  const queryClient = useQueryClient();

  const toast = useToast();

  const { mutateAsync: savePurchase, isLoading: isCreatingPurchase } = useMutation(() => createPurchase({
    products: productsInCart
  }), {
    onSuccess: async () => {
      setProductsInCart([]);
      onHideCartDrawer();
      await queryClient.invalidateQueries([ 'purchases' ]);
      await queryClient.invalidateQueries([ 'products' ]);
      toast({
        title: "Purchase created",
        description: "Your purchase was created successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "An error occurred while creating your purchase",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  });

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
      isFetching,
      savePurchase,
      isCreatingPurchase,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
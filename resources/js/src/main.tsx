import { ChakraProvider } from '@chakra-ui/react';
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from "./router";
import CartProvider from "./Contexts/CartContext";
import './main.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <CartProvider>
        <RouterProvider router={router}/>
      </CartProvider>
    </ChakraProvider>
  </React.StrictMode>,
)

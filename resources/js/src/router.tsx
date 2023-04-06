import { createBrowserRouter } from "react-router-dom";
import ProductsPage from "./Pages/Products";
import MainLayout from "./Layouts/Main";

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout/>,
    children: [
      {
        path: '/products',
        element: <ProductsPage/>,
      },
      {
        path: '/categories',
        element: null,
      },
      {
        path: '/taxes',
        element: null
      },
      {
        path: '/purchases',
        element: null
      },
    ]
  },
])

export {
  router
}
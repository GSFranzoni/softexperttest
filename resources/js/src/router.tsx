import { createBrowserRouter } from "react-router-dom";
import ProductList from "./Pages/ProductList";
import MainLayout from "./Layouts/Main";
import ProductCreatePage from "./Pages/ProductCreate";
import CategoryList from "./Pages/CategoryList";
import CategoryCreatePage from "./Pages/CategoryCreate";
import TaxList from "./Pages/TaxList";
import TaxCreatePage from "./Pages/TaxCreate";
import PurchaseList from "./Pages/PurchaseList";

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout/>,
    children: [
      {
        path: '/products',
        children: [
          {
            path: '',
            element: <ProductList/>,
          },
          {
            path: 'create',
            element: <ProductCreatePage/>,
          },
        ]
      },
      {
        path: '/categories',
        children: [
          {
            path: '',
            element: <CategoryList/>,
          },
          {
            path: 'create',
            element: <CategoryCreatePage/>,
          }
        ]
      },
      {
        path: '/taxes',
        children: [
          {
            path: '',
            element: <TaxList/>,
          },
          {
            path: 'create',
            element: <TaxCreatePage/>,
          }
        ]
      },
      {
        path: '/purchases',
        children: [
          {
            path: '',
            element: <PurchaseList/>,
          },
          {
            path: 'create',
            element: null
          }
        ]
      },
    ]
  },
])

export {
  router
}
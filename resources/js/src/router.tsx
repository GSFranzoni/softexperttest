import { createBrowserRouter } from "react-router-dom";
import ProductList from "./Pages/ProductList";
import MainLayout from "./Layouts/Main";
import ProductCreatePage from "./Pages/ProductCreate";
import CategoryList from "./Pages/CategoryList";
import CategoryCreatePage from "./Pages/CategoryCreate";
import TaxList from "./Pages/TaxList";
import TaxCreatePage from "./Pages/TaxCreate";
import PurchaseList from "./Pages/PurchaseList";
import TaxView from "./Pages/TaxView";
import LoginPage from "./Pages/LoginPage";
import AuthProvider from "./Contexts/AuthContext";
import HomePage from "./Pages/HomePage";
import UserList from "./Pages/UserList";
import UserView from "./Pages/UserView";
import UserCreatePage from "./Pages/UserCreate";
import RoleGuard from "./Guards/RoleGuard";
import { UserRole } from "./Types";

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthProvider>
      <MainLayout/>
    </AuthProvider>,
    children: [
      {
        path: '',
        element: <HomePage/>,
      },
      {
        path: '/products',
        element: <RoleGuard role={UserRole.REGULAR}/>,
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
        element: <RoleGuard role={UserRole.REGULAR}/>,
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
        element: <RoleGuard role={UserRole.REGULAR}/>,
        children: [
          {
            path: '',
            element: <TaxList/>,
          },
          {
            path: 'create',
            element: <TaxCreatePage/>,
          },
          {
            path: ':id',
            element: <TaxView/>,
          }
        ]
      },
      {
        path: '/purchases',
        element: <RoleGuard role={UserRole.REGULAR}/>,
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
      {
        path: '/users',
        element: <RoleGuard role={UserRole.ADMIN}/>,
        children: [
          {
            path: '',
            element: <UserList/>,
          },
          {
            path: 'create',
            element: <UserCreatePage/>,
          },
          {
            path: ':id',
            element: <UserView/>,
          },
        ]
      }
    ]
  },
  {
    path: '/auth',
    children: [
      {
        path: 'login',
        element: <LoginPage/>
      }
    ]
  }
])

export {
  router
}
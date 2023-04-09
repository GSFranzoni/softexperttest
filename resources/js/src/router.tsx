import { createBrowserRouter, Navigate } from "react-router-dom";
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
import HomePage from "./Pages/HomePage";
import UserList from "./Pages/UserList";
import UserView from "./Pages/UserView";
import UserCreatePage from "./Pages/UserCreate";
import RoleGuard from "./Guards/RoleGuard";
import { UserRole } from "./Types";
import CartProvider from "./Contexts/CartContext";
import TaxEditPage from "./Pages/TaxEdit";
import PurchaseView from "./Pages/PurchaseView";
import AuthLayout from "./Layouts/Auth";
import AuthGuard from "./Guards/AuthGuard";
import GuestGuard from "./Guards/GuestGuard";

const router = createBrowserRouter([
  {
    path: '/',
    element:
      <AuthGuard>
        <CartProvider>
          <MainLayout/>
        </CartProvider>
      </AuthGuard>,
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
            path: ':id/edit',
            element: <TaxEditPage/>,
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
            path: ':id',
            element: <PurchaseView/>,
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
    element: <GuestGuard>
      <AuthLayout/>
    </GuestGuard>,
    children: [
      {
        path: '',
        element: <Navigate to={'login'}/>
      },
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
export type ProductCategoryTax = {
  id: number;
  description: string;
  percent: number;
}

export type ProductCategory = {
  id: number;
  description: string;
  tax: ProductCategoryTax;
}

export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  stock: number;
  category: ProductCategory;
}

export type PurchasedProduct = Product & {
  quantity: number;
}

export type Purchase = {
  id: number;
  products: PurchasedProduct[];
  total: number;
  tax: number;
  date: string;
}

export type CreatePurchase = Pick<Purchase, 'products'>;

export enum FormScope {
  CREATE = 'create',
  EDIT = 'edit',
  VIEW = 'view',
  DELETE = 'delete',
}

export enum UserRole {
  ADMIN = 'admin',
  REGULAR = 'regular',
}

export type User = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  password?: string;
}

export type AuthenticatedUser = User & {
  token: string;
}
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
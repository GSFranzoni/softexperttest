import axios from 'axios';
import { Product } from "../../Types";

export const getProducts = async () => axios.get<{ products: Product[] }>('/products')
  .then((response) => response.data.products)

export const createProduct = async (product: any) => axios.post('/products', {
  ...product,
  productCategoryId: parseInt(product.category.id, 10),
})
  .then((response) => response.data)
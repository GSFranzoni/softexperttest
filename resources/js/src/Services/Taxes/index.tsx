import { ProductCategoryTax } from "../../Types";
import axios from "axios";

export const getTaxes = async () => axios.get<{ taxes: ProductCategoryTax[] }>('/products/categories/taxes')
  .then((response) => response.data.taxes)
  .catch((error) => ([]));

export const getTax = async (id: number) => axios.get<ProductCategoryTax>(`/products/categories/taxes/${id}`)
  .then((response) => response.data)

export const createTax = async (tax: ProductCategoryTax) => axios.post('/products/categories/taxes', {
  ...tax,
  percent: tax.percent / 100
})
  .then((response) => response.data)
  .catch((error) => ({}));

export const updateTax = async (tax: ProductCategoryTax) => axios.put(`/products/categories/taxes/${tax.id}`, {
  ...tax,
  percent: tax.percent / 100
})
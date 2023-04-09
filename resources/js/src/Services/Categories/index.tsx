import { ProductCategory, Purchase } from "../../Types";
import axios from "axios";

export const getCategories = async () => axios.get<{ purchases: Purchase[] }>('/products/categories')
  .then((response) => response.data.purchases)
  .catch((error) => ([]));

export const createCategory = async (category: ProductCategory) => axios.post('/products/categories', {
  ...category,
  taxId: category.tax.id
})
  .then((response) => response.data)
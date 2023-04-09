import { ProductCategory, Purchase } from "../../Types";
import axios from "axios";

export const getCategories = async () => axios.get<{ categories: ProductCategory[] }>('/products/categories')
  .then((response) => response.data.categories)
  .catch((error) => ([]));

export const createCategory = async (category: ProductCategory) => axios.post('/products/categories', {
  ...category,
  taxId: category.tax.id
})
  .then((response) => response.data)
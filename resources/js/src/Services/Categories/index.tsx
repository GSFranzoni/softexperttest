import { ProductCategory } from "../../Types";
import axios from "axios";

type PaginatedResponse<T> = {
  data: T[];
  pages: number;
}

export const getCategories = async () => axios.get<PaginatedResponse<ProductCategory>>('/products/categories')
  .then((response) => response.data.data)
  .catch((error) => ([]));

export const createCategory = async (category: ProductCategory) => axios.post('/products/categories', category)
  .then((response) => response.data)
import { ProductCategoryTax } from "../../Types";
import axios from "axios";

type PaginatedResponse<T> = {
  data: T[];
  pages: number;
}

export const getTaxes = async () => axios.get<PaginatedResponse<ProductCategoryTax>>('/products/categories/taxes')
  .then((response) => response.data.data)
  .catch((error) => ([]));

export const createTax = async (tax: ProductCategoryTax) => axios.post('/products/categories/taxes', tax)
  .then((response) => response.data)
  .catch((error) => ({}));
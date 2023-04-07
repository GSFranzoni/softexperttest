import { CreatePurchase, Purchase } from "../../Types";
import axios from "axios";

type PaginatedResponse<T> = {
  data: T[];
  pages: number;
}

export const getPurchases = async () => axios.get<PaginatedResponse<Purchase>>('/purchases')
  .then((response) => response.data.data)
  .catch((error) => ([]));

export const createPurchase = async (purchase: CreatePurchase) => axios.post('purchases', purchase)
  .then((response) => response.data)
  .catch((error) => ({}));
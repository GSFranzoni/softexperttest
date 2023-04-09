import { CreatePurchase, Purchase } from "../../Types";
import axios from "axios";

export const getPurchases = async () => axios.get<{ purchases: Purchase[] }>('/purchases')
  .then((response) => response.data.purchases)
  .catch((error) => ([]));

export const createPurchase = async (purchase: CreatePurchase) => axios.post('purchases', purchase)
  .then((response) => response.data)
  .catch((error) => ({}));
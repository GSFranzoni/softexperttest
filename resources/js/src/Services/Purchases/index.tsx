import { CreatePurchase, Purchase } from "../../Types";
import axios from "axios";

export const getPurchases = async () => axios.get<{ purchases: Purchase[] }>('/purchases')
  .then((response) => response.data.purchases)
  .catch((error) => ([]));

export const getPurchase = async ({ id }: { id: number }) => axios.get(`/purchases/${id}`)
  .then((response) => ({
    ...response.data,
    products: response.data.products.map((purchaseProduct: any) => ({
      ...purchaseProduct,
      ...purchaseProduct.product,
    }))
  }))

export const createPurchase = async (purchase: CreatePurchase) => axios.post('/purchases', purchase)
  .then((response) => response.data)
  .catch((error) => ({}));
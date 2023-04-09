import { User } from "../../Types";
import axios from "axios";

export const getUsers = async () => axios.get<{ users: User[] }>('/users')
  .then((response) => response.data.users)
  .catch((error) => ([]));

export const getUser = async (id: number) => axios.get<User>(`/users/${id}`)
  .then((response) => response.data)

export const deleteUser = async ({ id }: Pick<User, 'id'>) => axios.delete(`/users/${id}`)
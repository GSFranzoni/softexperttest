import axios from "axios";
import { LoginFormValues } from "../../Components/LoginForm";
import { AuthenticatedUser, User } from "../../Types";

export const login = async ({ email, password }: LoginFormValues) =>
  axios.post("/auth/login", { email, password })
    .then(({ data: { token } }) => ({ token }));

export const register = async (user: User) =>
  axios.post("/auth/register", user)

export const me = async () => axios.get<AuthenticatedUser>("/auth/me")
  .then(({ data }) => data);
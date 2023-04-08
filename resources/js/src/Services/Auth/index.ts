import axios from "axios";
import { LoginFormValues } from "../../Components/LoginForm";

export const login = async ({ email, password }: LoginFormValues) =>
  axios.post("/auth/login", { email, password })
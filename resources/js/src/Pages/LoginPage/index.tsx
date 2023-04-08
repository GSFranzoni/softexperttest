import { useToast, VStack } from "@chakra-ui/react";
import LoginForm from "../../Components/LoginForm";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";

const LoginPage = () => {
  const toast = useToast()
  const navigate = useNavigate()
  const { login, isLoggingIn } = useContext(AuthContext)
  return <VStack justifyContent={'center'} alignItems={'center'} width={'100%'} height={'100vh'}>
    <LoginForm onSubmit={login} isLoading={isLoggingIn}/>
  </VStack>
}

export default LoginPage
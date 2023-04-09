import { VStack } from "@chakra-ui/react";
import LoginForm from "../../Components/LoginForm";
import { useContext, useEffect } from "react";
import { AuthContext, AuthStatus } from "../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { login, isLoggingIn, status } = useContext(AuthContext)
  const navigate = useNavigate()
  useEffect(() => {
    if (status === AuthStatus.AUTHENTICATED) {
      navigate('/')
    }
  }, [ status ])
  return <VStack justifyContent={'center'} alignItems={'center'} width={'100%'} height={'100vh'}>
    <LoginForm onSubmit={login} isLoading={isLoggingIn}/>
  </VStack>
}

export default LoginPage
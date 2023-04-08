import { useToast, VStack } from "@chakra-ui/react";
import LoginForm from "../../Components/LoginForm";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login } from "../../Services/Auth";

const LoginPage = () => {
  const toast = useToast()
  const navigate = useNavigate()
  const { mutateAsync, isLoading } = useMutation(login, {
    onSuccess: () => {
      toast({
        title: 'Logged in',
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
      navigate('/')
    },
    onError: (error: any) => {
      debugger
      toast({
        title: 'Error',
        description: error?.response?.data?.message || 'Something went wrong',
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    }
  })
  return <VStack justifyContent={'center'} alignItems={'center'} width={'100%'} height={'100vh'}>
    <LoginForm onSubmit={mutateAsync} isLoading={isLoading}/>
  </VStack>
}

export default LoginPage
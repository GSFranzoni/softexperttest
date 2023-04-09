import { LoginFormValues } from "../../Components/LoginForm";
import { User } from "../../Types";
import React, { createContext, PropsWithChildren, useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { login as loginRequest, me } from "../../Services/Auth";
import { Card, Fade, HStack, Spinner, Text, useToast, VStack } from "@chakra-ui/react";
import LoginPage from "../../Pages/LoginPage";
import BackgroundOverlay from "../../Components/BackgroundOverlay";
import { LockIcon } from "@chakra-ui/icons";
import { updateLocalStorageToken } from "../../boot/axios";

export enum AuthStatus {
  IDLE,
  PENDING,
  AUTHENTICATED,
  UNAUTHENTICATED,
}

type AuthContextData = {
  status: AuthStatus;
  user: User | null;
  login: (user: LoginFormValues) => void;
  isLoggingIn: boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const toast = useToast()

  const [ status, setStatus ] = useState<AuthStatus>(AuthStatus.IDLE)

  const [ token, setToken ] = useState<string | null>(localStorage.getItem('token') || null)

  const {
    data: user,
    refetch
  } = useQuery<User>([ 'user' ], me, {
    enabled: false,
    retry: false,
    onSuccess: () => {
      setStatus(AuthStatus.AUTHENTICATED)
    },
    onError: () => {
      setStatus(AuthStatus.UNAUTHENTICATED)
    }
  })

  const { mutateAsync: login, isLoading: isLoggingIn } = useMutation(loginRequest, {
    onSuccess: ({ token: newToken }) => {
      setToken(newToken)
      toast({
        title: 'Logged in',
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error?.response?.data?.message || 'Something went wrong',
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    }
  })

  const logout = () => {
    setToken(null)
  }

  useEffect(() => {
    if (status === AuthStatus.UNAUTHENTICATED) {
      toast({
        title: 'Unauthorized',
        description: 'You need to login',
        status: 'error',
        duration: 2000,
        icon: <LockIcon/>,
        isClosable: true,
      })
      updateLocalStorageToken(null)
    }
  }, [ status ])

  useEffect(() => {
    updateLocalStorageToken(token)
    if (!token) {
      return setStatus(AuthStatus.UNAUTHENTICATED)
    }
    setStatus(AuthStatus.PENDING)
    refetch().then()
  }, [ token ])

  return (
    <AuthContext.Provider value={{
      user: user || null,
      status,
      login,
      isLoggingIn,
      logout
    }}>
      {status === AuthStatus.UNAUTHENTICATED && (
        <LoginPage/>
      )}
      <Fade in={status === AuthStatus.PENDING}>
        {status === AuthStatus.PENDING && (
          <BackgroundOverlay>
            <VStack as={Card} p={4} gap={1}>
              <Spinner
                thickness={'4px'}
                speed={'0.65s'}
                emptyColor={'gray.200'}
                color={'whatsapp.500'}
                size={'xl'}
              />
              <HStack>
                <LockIcon/>
                <Text fontSize={'sm'} fontWeight={'bold'}>
                  Verifying credentials...
                </Text>
              </HStack>
            </VStack>
          </BackgroundOverlay>
        )}
      </Fade>
      {[ AuthStatus.AUTHENTICATED ].includes(status) && children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
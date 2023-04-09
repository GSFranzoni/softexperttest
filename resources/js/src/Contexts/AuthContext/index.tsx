import { LoginFormValues } from "../../Components/LoginForm";
import { User } from "../../Types";
import React, { createContext, PropsWithChildren, useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { login as loginRequest, me } from "../../Services/Auth";
import { useToast } from "@chakra-ui/react";
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
  login: (values: LoginFormValues) => Promise<{ token: string }>;
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

      toast({
        title: 'Session expired',
        description: 'Please login again',
        status: 'error',
      })
    }
  })

  const { mutateAsync: login, isLoading: isLoggingIn } = useMutation(loginRequest, {
    onSuccess: ({ token: newToken }) => {
      setToken(newToken)
      toast({
        title: 'Logged in',
        status: 'success',
      })
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error?.response?.data?.message || 'Something went wrong',
        status: 'error',
      })
    }
  })

  const logout = () => {
    setToken(null)
    toast({
      title: 'Logged out',
      status: 'success',
    })
  }

  useEffect(() => {
    if (status === AuthStatus.UNAUTHENTICATED) {
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
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
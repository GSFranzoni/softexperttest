import React, { PropsWithChildren, useContext } from "react";
import { AuthContext, AuthStatus } from "../../Contexts/AuthContext";
import BackgroundOverlay from "../../Components/BackgroundOverlay";
import { Card, HStack, Spinner, Text, VStack } from "@chakra-ui/react";
import { LockIcon } from "@chakra-ui/icons";
import { Navigate } from "react-router-dom";

const AuthGuard: React.FC<PropsWithChildren> = ({ children }) => {
  const { status } = useContext(AuthContext);

  if (status === AuthStatus.AUTHENTICATED) {
    return <>{children}</>
  }

  if (status === AuthStatus.UNAUTHENTICATED) {
    return <Navigate to={'/auth/login'}/>
  }

  if (status === AuthStatus.PENDING) {
    return <BackgroundOverlay>
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
  }

  return null;
}

export default AuthGuard;
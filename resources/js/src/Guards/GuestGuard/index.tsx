import React, { PropsWithChildren, useContext } from "react";
import { AuthContext, AuthStatus } from "../../Contexts/AuthContext";
import { Navigate } from "react-router-dom";

const GuestGuard: React.FC<PropsWithChildren> = ({ children }) => {
  const { status } = useContext(AuthContext);

  if (status === AuthStatus.UNAUTHENTICATED) {
    return <>{children}</>
  }

  if (status === AuthStatus.AUTHENTICATED) {
    return <Navigate to={'/'}/>
  }

  return null
}

export default GuestGuard;
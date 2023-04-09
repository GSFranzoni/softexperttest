import React, { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { UserRole } from "../Types";
import { Alert, AlertTitle } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Icon } from "@iconify/react";

type RoleGuardProps = {
  role: UserRole;
}

const RoleGuard: React.FC<RoleGuardProps> = ({ role }) => {
  const { user } = useContext(AuthContext);

  if (user?.role !== role) {
    return <Alert
      status={'error'}
      variant={'solid'}
      gap={2}
    >
      <Icon icon={'mdi:lock'} width={20} height={20}/>
      <AlertTitle>
        You don't have permission to access this page
      </AlertTitle>
    </Alert>
  }

  return (
    <Outlet/>
  )
}

export default RoleGuard;
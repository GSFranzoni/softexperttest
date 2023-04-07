import { Link, useLocation } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import React from "react";
import { ChevronRightIcon } from "@chakra-ui/icons";

type CrumbsType = {
  path: string,
  label: string
}

const CustomBreadcrumb: React.FC<{ crumbs: CrumbsType[] }> = ({ crumbs }) => {
  const { pathname } = useLocation();
  return (
    <Breadcrumb spacing='8px' separator={<ChevronRightIcon color='gray.500'/>}>
      {crumbs.map(crumb => <BreadcrumbItem>
          <BreadcrumbLink as={Link} to={crumb.path}>
            {crumb.label}
          </BreadcrumbLink>
        </BreadcrumbItem>
      )}
    </Breadcrumb>
  );
};

export default CustomBreadcrumb
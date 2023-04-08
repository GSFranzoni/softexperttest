import { HStack } from "@chakra-ui/react";
import React, { PropsWithChildren } from "react";

const BackgroundOverlay: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <HStack
      justifyContent={'center'}
      alignItems={'center'}
      width={'100%'}
      height={'100vh'}
      position={'absolute'}
      top={0}
      left={0}
      zIndex={100}
      backgroundColor={'rgba(0,0,0,0.7)'}
    >
      {children}
    </HStack>
  )
}

export default BackgroundOverlay
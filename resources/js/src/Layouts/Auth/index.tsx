import { Box, } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <Box p={5}>
      <Outlet/>
    </Box>
  );
}
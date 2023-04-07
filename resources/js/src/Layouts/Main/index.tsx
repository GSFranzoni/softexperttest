import {
  Avatar,
  Badge,
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { NavLink, NavLinkProps, Outlet } from 'react-router-dom';
import Logo from '../../assets/react.svg';
import { ReactNode, useContext } from "react";
import CartDrawer from "../../Components/CartDrawer";
import { CartContext } from "../../Contexts/CartContext";
import { Icon } from '@iconify/react';

const links = [
  {
    label: 'Products',
    href: '/products',
  },
  {
    label: 'Purchases',
    href: '/purchases',
  },
  {
    label: 'Categories',
    href: '/categories',
  },
  {
    label: 'Taxes',
    href: '/taxes',
  }
]

const CustomNavLink = ({ children, to, ...props }: NavLinkProps) => {
  return (
    <Link
      as={NavLink}
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      _activeLink={{
        textDecoration: 'none',
        color: useColorModeValue('gray.800', 'white'),
        bg: useColorModeValue('gray.300', 'gray.700'),
      }}
      to={to}
      {...props as any}
    >
      {children as ReactNode}
    </Link>
  );
}

export default function MainLayout() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { showCartDrawer, onShowCartDrawer, onHideCartDrawer, itemsCount } = useContext(CartContext)
  return (
    <Stack maxH={'100%'}>
      <CartDrawer/>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <HStack>
            <Image src={Logo} alt={'Logo'} boxSize={'40px'} mr={2}/>
            {links.map((link) => (
              <CustomNavLink key={link.label} to={link.href}>
                {link.label}
              </CustomNavLink>
            ))}
          </HStack>
          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={5}>
              <HStack>
                <Box position={'relative'}>
                  <Button onClick={onShowCartDrawer}>
                    <Icon icon="mdi:cart"/>
                  </Button>
                  {itemsCount > 0 && (
                    <Badge
                      position={'absolute'}
                      top={-1}
                      right={0}
                      colorScheme={'red'}
                      rounded={'full'}
                      variant={'solid'}
                      cursor={'pointer'}
                      onClick={onShowCartDrawer}
                    >
                      {itemsCount}
                    </Badge>
                  )}
                </Box>
                <Button onClick={toggleColorMode}>
                  {colorMode === 'light' ? <MoonIcon/> : <SunIcon/>}
                </Button>
              </HStack>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    src={'https://avatars.dicebear.com/api/male/username.svg'}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br/>
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={'https://avatars.dicebear.com/api/male/username.svg'}
                    />
                  </Center>
                  <br/>
                  <Center>
                    <p>Username</p>
                  </Center>
                  <br/>
                  <MenuDivider/>
                  <MenuItem>Your Servers</MenuItem>
                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
      <Box p={5}>
        <Outlet/>
      </Box>
    </Stack>
  );
}
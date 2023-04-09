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
  Text,
  useColorMode,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { NavLink, NavLinkProps, Outlet, useNavigate } from 'react-router-dom';
import Logo from '../../assets/react.svg';
import { ReactNode, useContext, useMemo } from "react";
import CartDrawer from "../../Components/CartDrawer";
import { CartContext } from "../../Contexts/CartContext";
import { Icon } from '@iconify/react';
import { UserRole } from "../../Types";
import { AuthContext } from "../../Contexts/AuthContext";
import { makeGravatarUrl } from "../../Utils/Gravatar";

const links = [
  {
    label: 'Products',
    href: '/products',
    roles: [ UserRole.REGULAR ]
  },
  {
    label: 'Purchases',
    href: '/purchases',
    roles: [ UserRole.REGULAR ]
  },
  {
    label: 'Categories',
    href: '/categories',
    roles: [ UserRole.REGULAR ]
  },
  {
    label: 'Taxes',
    href: '/taxes',
    roles: [ UserRole.REGULAR ]
  },
  {
    label: 'Users',
    href: '/users',
    roles: [ UserRole.ADMIN ]
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
  const { onShowCartDrawer, itemsCount } = useContext(CartContext)
  const navigate = useNavigate()
  const { user, logout } = useContext(AuthContext)
  const allowedLinks = links.filter(link => link.roles.includes(user?.role as UserRole))
  const gravatarUrl = useMemo(() => makeGravatarUrl({
    email: user?.email as string,
    size: 200
  }), [ user?.email ])
  return (
    <Stack maxH={'100%'}>
      <CartDrawer/>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <HStack>
            <Image cursor={'pointer'} src={Logo} alt={'Logo'} boxSize={'40px'} mr={2} onClick={() => {
              navigate('/')
            }}/>
            {allowedLinks.map((link) => (
              <CustomNavLink key={link.label} to={link.href}>
                {link.label}
              </CustomNavLink>
            ))}
          </HStack>
          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={5}>
              <HStack>
                <Box position={'relative'}>
                  {user?.role === UserRole.REGULAR && (
                    <Button onClick={onShowCartDrawer}>
                      <Icon icon="mdi:cart"/>
                    </Button>
                  )}
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
                    src={gravatarUrl}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br/>
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={gravatarUrl}
                    />
                  </Center>
                  <br/>
                  <VStack spacing={0}>
                    <Center>
                      <Text fontSize={'md'} fontWeight={'bold'}>
                        {user?.name}
                      </Text>
                    </Center>
                    <Center>
                      <Text fontSize={'xs'} fontWeight={'normal'} color={'gray.500'}>
                        {user?.email}
                      </Text>
                    </Center>
                  </VStack>
                  <br/>
                  <MenuDivider/>
                  <MenuItem onClick={() => {
                    logout()
                  }}>Logout</MenuItem>
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
  )
    ;
}
import { User, UserRole } from "../../Types";
import { Badge, HStack, IconButton, Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../Services/Users";
import { Icon } from "@iconify/react";

type UserGridProps = {
  onUserClicked: (user: User) => void;
  onDeleteClicked: (user: User) => void;
}

const UserGrid = ({ onUserClicked, onDeleteClicked }: UserGridProps) => {
  const { data: users, isFetching } = useQuery([ 'users' ], getUsers, {
    refetchOnWindowFocus: false,
    initialData: [],
  })
  const badges = {
    [UserRole.ADMIN]: {
      colorScheme: 'red',
      label: 'Admin'
    },
    [UserRole.REGULAR]: {
      colorScheme: 'green',
      label: 'Regular'
    }
  }
  return (
    <TableContainer width={'100%'}>
      <Table variant={'striped'}>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Role</Th>
            <Th>Password</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user) => (
            <Tr key={user.id} onClick={() => onUserClicked(user)}
                _hover={{ cursor: 'pointer', opacity: 0.8 }}>
              <Th>{user.id}</Th>
              <Th>{user.name}</Th>
              <Th>{user.email}</Th>
              <Th>
                <Badge
                  colorScheme={badges[user.role].colorScheme}
                  rounded={'full'}
                  p={1}
                  textTransform={'none'}
                >
                  {badges[user.role].label}
                </Badge>
              </Th>
              <Th>* * * * *</Th>
              <Th>
                <HStack>
                  <IconButton
                    aria-label={'delete user'}
                    icon={<Icon icon={'mdi:delete'} width={20} height={20}/>}
                    size={'sm'}
                    colorScheme={'red'}
                    variant={'link'}
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteClicked(user);
                    }}
                  />
                </HStack>
              </Th>
            </Tr>
          ))}
          {users.length === 0 && (
            <Tr>
              <Th colSpan={6} textAlign={'center'}>
                {isFetching ? 'Loading...' : 'No users found'}
              </Th>
            </Tr>
          )}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default UserGrid;
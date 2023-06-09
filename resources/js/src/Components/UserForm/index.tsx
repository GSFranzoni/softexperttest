import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Radio,
  RadioGroup,
  VStack
} from "@chakra-ui/react";
import React from "react";
import { FormScope, UserRole } from "../../Types";
import { Form } from "react-router-dom";

type UserFormProps = {
  scope: FormScope;
  onSubmit: (data: any) => void;
  onCancel?: () => void;
  defaultValues?: any;
  isLoading?: boolean;
}

const UserForm: React.FC<UserFormProps> = ({ scope, isLoading, onSubmit, onCancel, defaultValues }) => {
  const schema = yup.object().shape({
    id: yup.number(),
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    role: yup.string().required('Role is required'),
    password: yup.string().required().test('password', 'Password must be at least 8 characters', (value) => {
      return value?.length >= 8
    }),
  })
  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...defaultValues,
      role: defaultValues?.role || UserRole.REGULAR,
    }
  })
  return (
    <FormProvider {...form}>
      <Card width={'100%'} boxShadow={'2xl'}>
        <Form onSubmit={form.handleSubmit(onSubmit)}>
          <CardBody>
            <VStack alignItems={'start'} spacing={4}>
              <Box width={'100px'}>
                {scope !== FormScope.CREATE && (
                  <FormControl>
                    <FormLabel htmlFor="id">ID</FormLabel>
                    <Input
                      id="id"
                      isReadOnly
                      value={defaultValues?.id}
                    />
                  </FormControl>
                )}
              </Box>
              <FormControl isInvalid={!!form.formState.errors.name}>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  id="name"
                  placeholder={'Please enter a name'}
                  {...form.register('name')}
                  isReadOnly={scope === FormScope.VIEW}
                />
                {form.formState.errors.name && (
                  <FormErrorMessage>{form.formState.errors.name.message as string}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!form.formState.errors.email}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  placeholder={'Please enter an email'}
                  {...form.register('email')}
                  type={'email'}
                  isReadOnly={scope === FormScope.VIEW}
                />
                {form.formState.errors.email && (
                  <FormErrorMessage>{form.formState.errors.email.message as string}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!form.formState.errors.role}>
                <FormLabel htmlFor="role">Role</FormLabel>
                <RadioGroup id="role" defaultValue={UserRole.REGULAR} value={form.watch('role')}
                            onChange={(role: string) => {
                              form.setValue('role', role)
                            }}>
                  <HStack>
                    <Radio value={UserRole.ADMIN} isReadOnly={scope === FormScope.VIEW}>Admin</Radio>
                    <Radio value={UserRole.REGULAR} isReadOnly={scope === FormScope.VIEW}>Regular</Radio>
                  </HStack>
                </RadioGroup>
                {form.formState.errors.role && (
                  <FormErrorMessage>{form.formState.errors.role.message as string}</FormErrorMessage>
                )}
              </FormControl>
              {scope === FormScope.CREATE && (
                <FormControl isInvalid={!!form.formState.errors.password}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input
                    id="password"
                    placeholder={'Please enter a password'}
                    {...form.register('password')}
                    type={'password'}
                  />
                  {form.formState.errors.password && (
                    <FormErrorMessage>{form.formState.errors.password.message as string}</FormErrorMessage>
                  )}
                </FormControl>
              )}
            </VStack>
          </CardBody>
          <CardFooter>
            <HStack justifyContent={'flex-end'} width={'100%'}>
              <Button colorScheme={'gray'} onClick={onCancel}>Back</Button>
              {[ FormScope.CREATE, FormScope.EDIT ].includes(scope) && (
                <Button
                  type={'submit'}
                  colorScheme={'whatsapp'}
                  isLoading={isLoading}
                >Submit</Button>
              )}
            </HStack>
          </CardFooter>
        </Form>
      </Card>
    </FormProvider>
  )
}

UserForm.defaultProps = {
  defaultValues: {
    id: '',
    name: '',
    email: '',
    role: UserRole.REGULAR,
    password: '',
  }
}

export default UserForm
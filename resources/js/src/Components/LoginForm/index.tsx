import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  VStack
} from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Icon } from "@iconify/react";
import { Form } from "react-router-dom";

export type LoginFormValues = {
  email: string;
  password: string;
}

type LoginFormProps = {
  onSubmit: (values: LoginFormValues) => void;
  isLoading: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isLoading }) => {
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
    showPassword: yup.boolean().default(false),
  })
  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      showPassword: false,
    }
  })
  return (
    <FormProvider {...form}>
      <Form onSubmit={form.handleSubmit(onSubmit)}>
        <Card boxShadow={'xl'} minWidth={'350px'} maxWidth={'100%'}>
          <CardHeader>
            <Text fontSize={'2xl'} fontWeight={'bold'}>Login</Text>
          </CardHeader>
          <CardBody py={0}>
            <VStack alignItems={'start'} spacing={4}>
              <FormControl isInvalid={!!form.formState.errors.email}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<Icon icon={'mdi:email'} width={20} height={20}/>}
                  />
                  <Input id="email" type="email" placeholder={'E-mail'} {...form.register('email')}/>
                </InputGroup>
                {form.formState.errors.email && (
                  <FormErrorMessage>{form.formState.errors.email.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!form.formState.errors.password}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<Icon icon={'mdi:lock'} width={20} height={20}/>}
                  />
                  <Input id="password"
                         placeholder={'Password'}
                         type={form.watch('showPassword') ? 'text' : 'password'} {...form.register('password')}/>
                  <InputRightElement>
                    <IconButton
                      variant={'ghost'}
                      size={'sm'}
                      aria-label={'Show password'}
                      icon={<Icon icon={form.watch('showPassword') ? 'mdi:eye-off' : 'mdi:eye'} width={20}
                                  height={20}/>}
                      onClick={() => {
                        form.setValue('showPassword', !form.watch('showPassword'))
                      }}
                    />
                  </InputRightElement>
                </InputGroup>
                {form.formState.errors.password && (
                  <FormErrorMessage>{form.formState.errors.password.message}</FormErrorMessage>
                )}
              </FormControl>
            </VStack>
          </CardBody>
          <CardFooter>
            <HStack justifyContent={'flex-end'} width={'100%'}>
              <Button
                size={'sm'}
                colorScheme={'whatsapp'}
                type={'submit'}
                variant={'solid'}
                isLoading={isLoading}
              >
                Login
              </Button>
            </HStack>
          </CardFooter>
        </Card>
      </Form>
    </FormProvider>
  )
}

export default LoginForm
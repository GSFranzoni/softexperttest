import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  VStack
} from "@chakra-ui/react";
import React from "react";
import { Icon } from "@iconify/react";

type ProductFormProps = {
  onSubmit: (data: any) => void;
  onCancel?: () => void;
  defaultValues?: any;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, onCancel, defaultValues }) => {
  const schema = yup.object().shape({
    name: yup.string().required(),
    description: yup.string().required(),
    price: yup.number().transform(
      (value, originalValue) => (originalValue === '' ? undefined : value)
    ).required(),
  })
  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  })
  return (
    <Card width={'100%'} boxShadow={'2xl'}>
      <CardBody>
        <FormProvider {...form}>
          <VStack alignItems={'start'} spacing={4}>
            <FormControl isInvalid={!!form.formState.errors.name}>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input id="name" placeholder={'Please enter a name'} {...form.register('name')} />
              {form.formState.errors.name && (
                <FormErrorMessage>{form.formState.errors.name.message as string}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={!!form.formState.errors.description}>
              <FormLabel htmlFor="description">Description</FormLabel>
              <Textarea id="description" placeholder={'Please enter a description'} {...form.register('description')} />
              {form.formState.errors.description && (
                <FormErrorMessage>{form.formState.errors.description.message as string}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={!!form.formState.errors.price}>
              <FormLabel htmlFor="price">Price</FormLabel>
              <InputGroup>
                <InputLeftElement>
                  <Icon icon={'mdi:currency-usd'}/>
                </InputLeftElement>
                <Input id="price" {...form.register('price')} type={'number'}/>
              </InputGroup>
              {form.formState.errors.price && (
                <FormErrorMessage>{form.formState.errors.price.message as string}</FormErrorMessage>
              )}
            </FormControl>
          </VStack>
        </FormProvider>
      </CardBody>
      <CardFooter>
        <HStack justifyContent={'flex-end'} width={'100%'}>
          <Button colorScheme={'gray'} onClick={onCancel}>Back</Button>
          <Button onClick={form.handleSubmit(onSubmit)} colorScheme={'whatsapp'}>Submit</Button>
        </HStack>
      </CardFooter>
    </Card>
  )
}

ProductForm.defaultProps = {
  defaultValues: {
    name: '',
    description: '',
    price: 0,
  }
}

export default ProductForm
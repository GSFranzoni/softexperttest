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
  Textarea,
  VStack
} from "@chakra-ui/react";
import React from "react";

type CategoryFormProps = {
  onSubmit: (data: any) => void;
  onCancel?: () => void;
  defaultValues?: any;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ onSubmit, onCancel, defaultValues }) => {
  const schema = yup.object().shape({
    description: yup.string().required(),
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
            <FormControl isInvalid={!!form.formState.errors.description}>
              <FormLabel htmlFor="description">Description</FormLabel>
              <Textarea id="description" placeholder={'Please enter a description'} {...form.register('description')} />
              {form.formState.errors.description && (
                <FormErrorMessage>{form.formState.errors.description.message as string}</FormErrorMessage>
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

CategoryForm.defaultProps = {
  defaultValues: {
    description: '',
  }
}

export default CategoryForm
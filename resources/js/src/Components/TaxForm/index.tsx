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
  VStack
} from "@chakra-ui/react";
import React from "react";
import { Icon } from "@iconify/react";

type TaxFormProps = {
  onSubmit: (data: any) => void;
  onCancel?: () => void;
  defaultValues?: any;
}

const TaxForm: React.FC<TaxFormProps> = ({ onSubmit, onCancel, defaultValues }) => {
  const schema = yup.object().shape({
    description: yup.string().required(),
    percent: yup.number().min(0).max(100).transform(
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
            <FormControl isInvalid={!!form.formState.errors.description}>
              <FormLabel htmlFor="description">Description</FormLabel>
              <Input id="description" placeholder={'Please enter a description'} {...form.register('description')} />
              {form.formState.errors.description && (
                <FormErrorMessage>{form.formState.errors.description.message as string}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={!!form.formState.errors.percent}>
              <FormLabel htmlFor="percent">Percent</FormLabel>
              <InputGroup>
                <InputLeftElement>
                  <Icon icon="mdi:percent"/>
                </InputLeftElement>
                <Input id="percent" {...form.register('percent')} type={'number'} min={0} max={1} step={0.01}/>
              </InputGroup>
              {form.formState.errors.percent && (
                <FormErrorMessage>{form.formState.errors.percent.message as string}</FormErrorMessage>
              )}
            </FormControl>
          </VStack>
        </FormProvider>
      </CardBody>
      <CardFooter>
        <HStack justifyContent={'flex-end'} width={'100%'}>
          <Button colorScheme={'gray'} onClick={onCancel}>Back</Button>
          <Button onClick={form.handleSubmit(onSubmit)} colorScheme={'whatsapp'} isLoading={
            form.formState.isSubmitting
          }>Submit</Button>
        </HStack>
      </CardFooter>
    </Card>
  )
}

TaxForm.defaultProps = {
  defaultValues: {
    description: '',
    percent: 0,
  }
}

export default TaxForm
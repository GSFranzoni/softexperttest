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
  InputGroup,
  InputLeftElement,
  VStack
} from "@chakra-ui/react";
import React from "react";
import { Icon } from "@iconify/react";
import { FormScope } from "../../Types";
import { Form } from "react-router-dom";

type TaxFormProps = {
  scope: FormScope;
  onSubmit: (data: any) => void;
  onCancel?: () => void;
  defaultValues?: any;
}

const TaxForm: React.FC<TaxFormProps> = ({ scope, onSubmit, onCancel, defaultValues }) => {
  const schema = yup.object().shape({
    description: yup.string().required(),
    percent: yup.number().min(0).max(100).transform(
      (value, originalValue) => (originalValue === '' && [ FormScope.CREATE, FormScope.EDIT ].includes(scope) ? undefined : value)
    ).required(),
  })
  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  })
  return (
    <Card width={'100%'} boxShadow={'2xl'}>
      <FormProvider {...form}>
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
              <FormControl isInvalid={!!form.formState.errors.description}>
                <FormLabel htmlFor="description">Description</FormLabel>
                <Input
                  id="description"
                  placeholder={'Please enter a description'}
                  {...form.register('description')}
                  isReadOnly={scope === FormScope.VIEW}
                />
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
                  <Input
                    id="percent"
                    {...form.register('percent')}
                    type={'number'}
                    min={0}
                    max={100}
                    step={1}
                    isReadOnly={scope === FormScope.VIEW}
                  />
                </InputGroup>
                {form.formState.errors.percent && (
                  <FormErrorMessage>{form.formState.errors.percent.message as string}</FormErrorMessage>
                )}
              </FormControl>
            </VStack>
          </CardBody>
          <CardFooter>
            <HStack justifyContent={'flex-end'} width={'100%'}>
              <Button colorScheme={'gray'} onClick={onCancel}>Back</Button>
              {[ FormScope.CREATE, FormScope.EDIT ].includes(scope) && (
                <Button type={'submit'} colorScheme={'whatsapp'} isLoading={
                  form.formState.isSubmitting
                }>Submit</Button>
              )}
            </HStack>
          </CardFooter>
        </Form>
      </FormProvider>
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
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Card,
  CardBody,
  CardFooter,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Textarea,
  useDisclosure,
  VStack
} from "@chakra-ui/react";
import React from "react";
import { Icon } from "@iconify/react";
import TaxGrid from "../TaxGrid";

type CategoryFormProps = {
  onSubmit: (data: any) => void;
  onCancel?: () => void;
  defaultValues?: any;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ onSubmit, onCancel, defaultValues }) => {
  const schema = yup.object().shape({
    description: yup.string().required(),
    tax: yup.object().shape({
      id: yup.string().required(),
      description: yup.string(),
      percent: yup.number()
    }).required('Tax is required'),
  })
  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  })
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef(null)
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
            <FormControl isInvalid={!!form.formState.errors.tax}>
              <FormLabel htmlFor="percent">Tax</FormLabel>
              <InputGroup>
                <Input
                  id="tax"
                  type={'text'}
                  value={form.watch('tax')?.description
                    ? `${form.watch('tax')?.description} - ${form.watch('tax')?.percent}%`
                    : 'Please select a tax...'
                  }
                  isReadOnly
                  isDisabled={form.watch('tax')?.id === undefined}
                />
                <InputRightElement>
                  <IconButton
                    aria-label={'search'}
                    icon={<Icon icon="mdi:search"/>}
                    onClick={onOpen}
                  />
                </InputRightElement>
              </InputGroup>
              {!!form.formState.errors.tax && (
                <FormErrorMessage>{form.formState.errors.tax.message as string}</FormErrorMessage>
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
      <AlertDialog
        onClose={onClose}
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        motionPreset={'slideInBottom'}
        isCentered
        size={'2xl'}
      >
        <AlertDialogOverlay/>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Select a tax
          </AlertDialogHeader>
          <AlertDialogBody>
            <TaxGrid onTaxClick={(tax) => {
              form.setValue('tax', tax)
              onClose()
            }}/>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Close
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  )
}

CategoryForm.defaultProps =
  {
    defaultValues: {
      description: '',
    }
  }

export default CategoryForm
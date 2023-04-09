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
  Grid,
  GridItem,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Textarea,
  useDisclosure,
  VStack
} from "@chakra-ui/react";
import React from "react";
import { Icon } from "@iconify/react";
import CategoryGrid from "../CategoryGrid";

type ProductFormProps = {
  onSubmit: (data: any) => void;
  isLoading?: boolean;
  onCancel?: () => void;
  defaultValues?: any;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, isLoading, onCancel, defaultValues }) => {
  const schema = yup.object().shape({
    name: yup.string().required(),
    description: yup.string().required(),
    price: yup.number().transform(
      (value, originalValue) => (originalValue === '' ? undefined : value)
    ).required(),
    stock: yup.number().transform(
      (value, originalValue) => (originalValue === '' ? undefined : value)
    ).required(),
    category: yup.object().shape({
      id: yup.string().required(),
      description: yup.string(),
    }).required('Category is required'),
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
            <Grid templateColumns={'repeat(2, 1fr)'} gap={4} width={'100%'}>
              <GridItem>
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
              </GridItem>
              <GridItem>
                <FormControl isInvalid={!!form.formState.errors.stock}>
                  <FormLabel htmlFor="stock">Stock</FormLabel>
                  <InputGroup>
                    <Input id="stock" {...form.register('stock')} type={'number'}/>
                  </InputGroup>
                  {form.formState.errors.stock && (
                    <FormErrorMessage>{form.formState.errors.stock.message as string}</FormErrorMessage>
                  )}
                </FormControl>
              </GridItem>
            </Grid>
            <FormControl isInvalid={!!form.formState.errors.category}>
              <FormLabel htmlFor="percent">Category</FormLabel>
              <InputGroup>
                <Input
                  id="category"
                  type={'text'}
                  value={form.watch('category')?.description
                    ? `${form.watch('category')?.description} - ${form.watch('category')?.tax?.percent}%`
                    : 'Please select a category...'
                  }
                  isReadOnly
                  isDisabled={form.watch('category')?.id === undefined}
                />
                <InputRightElement>
                  <IconButton
                    aria-label={'search'}
                    icon={<Icon icon="mdi:search"/>}
                    onClick={onOpen}
                  />
                </InputRightElement>
              </InputGroup>
              {!!form.formState.errors.category && (
                <FormErrorMessage>{form.formState.errors.category.message as string}</FormErrorMessage>
              )}
            </FormControl>
          </VStack>
        </FormProvider>
      </CardBody>
      <CardFooter>
        <HStack justifyContent={'flex-end'} width={'100%'}>
          <Button colorScheme={'gray'} onClick={onCancel}>Back</Button>
          <Button onClick={form.handleSubmit(onSubmit)} colorScheme={'whatsapp'} isLoading={isLoading}>Submit</Button>
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
            Select a category
          </AlertDialogHeader>
          <AlertDialogBody>
            <CategoryGrid onCategoryClick={(category) => {
              form.setValue('category', category)
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

ProductForm.defaultProps = {
  defaultValues: {
    name: '',
    description: '',
    price: 0,
  }
}

export default ProductForm
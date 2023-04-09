import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure
} from "@chakra-ui/react";
import React from "react";

type useConfirmationProps<T> = {
  onConfirm: (context: T) => void;
  onCancel?: (context: T) => void;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
}

const useConfirmation = <T, >({
                                onConfirm = () => {
                                },
                                onCancel = () => {
                                },
                                title = 'Confirm',
                                description = 'Are you sure you want to do this?',
                                confirmLabel = 'Confirm',
                                cancelLabel = 'Cancel',
                              }: useConfirmationProps<T>) => {
  const cancelRef = React.useRef() as React.MutableRefObject<HTMLButtonElement>;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [ context, setContext ] = React.useState<T>();

  const confirm = (context: T) => {
    setContext(context);
    onOpen();
  }

  const ConfirmDialog = () => (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            {title}
          </AlertDialogHeader>
          <AlertDialogBody>
            {description}
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={() => {
              onClose();
              onCancel(context as T);
            }}>
              {cancelLabel}
            </Button>
            <Button colorScheme='red' onClick={() => {
              onClose();
              onConfirm(context as T);
            }} ml={3}>
              {confirmLabel}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );

  return {
    ConfirmDialog,
    confirm,
  }
}

export {
  useConfirmation
};
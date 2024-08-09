import { Dialog, Flex, Button } from "@radix-ui/themes";

export interface Props {
  onClose: () => void;
}

export function Popup({ onClose }: Props) {
  return (
    <Dialog.Root open>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Invoice was created</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Go to stripe and send invoice to customer.
        </Dialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray" onClick={onClose}>
              Close
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}

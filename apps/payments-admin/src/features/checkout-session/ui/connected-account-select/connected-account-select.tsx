import { forwardRef } from "react";
import { ConnectedAccount } from "@/shared/model/connected-account";
import { Select, Text, Flex } from "@radix-ui/themes";
import { useController } from "react-hook-form";

interface Props {
  connectedAccounts?: ConnectedAccount[];
}

export const ConnectedAccountSelect = forwardRef<HTMLDivElement, Props>(
  ({ connectedAccounts, ...rest }, ref) => {
    const { field } = useController({
      name: "connectedAccount",
      rules: {
        required: true,
      },
    });

    return (
      <Flex direction="column" ref={ref} {...rest}>
        <Text>Connected Account:</Text>
        <Select.Root
          size="3"
          value={field.value}
          onValueChange={field.onChange}
          name={field.name}
        >
          <Select.Trigger ref={field.ref} onBlur={field.onBlur} />
          <Select.Content>
            {connectedAccounts?.map(({ id, name }) => {
              return (
                <Select.Item key={id} value={id}>
                  {name}
                </Select.Item>
              );
            })}
          </Select.Content>
        </Select.Root>
      </Flex>
    );
  },
);

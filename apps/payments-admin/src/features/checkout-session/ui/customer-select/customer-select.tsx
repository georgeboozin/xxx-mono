import { forwardRef } from "react";
import { Select, Text, Flex } from "@radix-ui/themes";
import { useController } from "react-hook-form";
import { Customer } from "@/shared/model/customer";

export interface Props {
  customers?: Customer[];
}

export const CustomerSelect = forwardRef<HTMLDivElement, Props>(
  ({ customers, ...rest }, ref) => {
    const { field } = useController({
      name: "customer",
      rules: {
        required: true,
      },
    });

    return (
      <Flex direction="column" ref={ref} {...rest}>
        <Text>Customer:</Text>
        <Select.Root
          size="3"
          value={field.value}
          onValueChange={field.onChange}
          name={field.name}
        >
          <Select.Trigger ref={field.ref} onBlur={field.onBlur} />
          <Select.Content>
            {customers?.map(({ id, name, email }) => {
              return (
                <Select.Item key={id} value={id}>
                  {name} - {email}
                </Select.Item>
              );
            })}
          </Select.Content>
        </Select.Root>
      </Flex>
    );
  },
);

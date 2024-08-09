import { forwardRef } from "react";
import { Product } from "@/shared/model/product";
import { Select, Text, Flex } from "@radix-ui/themes";
import { useController } from "react-hook-form";

export interface Props {
  products?: Product[];
}

export const ProductNameSelect = forwardRef<HTMLDivElement, Props>(
  ({ products, ...rest }, ref) => {
    const { field } = useController({
      name: "productName",
      rules: {
        required: true,
      },
    });

    return (
      <Flex direction="column" ref={ref} {...rest}>
        <Text>Product Name:</Text>
        <Select.Root
          size="3"
          value={field.value}
          onValueChange={field.onChange}
          name={field.name}
        >
          <Select.Trigger ref={field.ref} onBlur={field.onBlur} />
          <Select.Content>
            {products?.map(({ id, name }) => {
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

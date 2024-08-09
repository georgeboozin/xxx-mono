import { forwardRef } from "react";
import { useController } from "react-hook-form";
import { TextField, Text, Flex, IconButton } from "@radix-ui/themes";
import { Pencil1Icon } from "@radix-ui/react-icons";
import s from "./product-price-field.module.css";

export const ProductPriceField = forwardRef<HTMLDivElement>(
  ({ ...rest }, ref) => {
    const { field } = useController({
      name: "price",
      rules: {
        required: true,
      },
    });

    return (
      <Flex direction="column" className={s.Root} ref={ref} {...rest}>
        <Text>Price:</Text>
        <TextField.Root
          size="3"
          value={field.value || ""}
          onChange={field.onChange}
          name={field.name}
        >
          <TextField.Slot>$</TextField.Slot>
          <TextField.Slot>
            <IconButton size="1" variant="ghost" type="button">
              <Pencil1Icon height="14" width="14" />
            </IconButton>
          </TextField.Slot>
        </TextField.Root>
      </Flex>
    );
  },
);

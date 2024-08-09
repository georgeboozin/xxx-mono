import { useEffect, useCallback } from "react";
import { Flex, Text, Button, Skeleton } from "@radix-ui/themes";
import { useForm, FormProvider } from "react-hook-form";
import { ConnectedAccountSelect } from "../connected-account-select";
import { ProductNameSelect } from "../product-name-select";
import { CustomerSelect } from "../customer-select";
import { FeeField } from "../fee-field";
import { ProductPriceField } from "../product-price-field";
import { createInvoice, finalizeInvoice } from "../../api/invoice";
import { createInvoiceItem } from "../../api/invoice-item";
import { Popup } from "../popup";
import { useFormData, useFormState } from "../../lib/form.hooks";
import { calcPrice, calcFee, calcLawyerRecieves } from "../../lib/form";
import { FormValues } from "../../lib/form";
import s from "./form.module.css";

export function Form() {
  const methods = useForm<FormValues>();
  const connectedAccount = methods.watch("connectedAccount");
  const { connectedAccounts, products, lineItems, customers, isFetching } =
    useFormData(connectedAccount);
  const {
    lawyerRecieves,
    setLawyerRecieves,
    success,
    setSuccess,
    handleClose,
  } = useFormState();
  const productName = methods.watch("productName");
  const price = methods.watch("price");
  const fee = methods.watch("fee");

  const handleSubmit = useCallback(
    async (data: FormValues) => {
      const invoice = await createInvoice(data);
      if (invoice) {
        const invoiceItem = await createInvoiceItem(data, invoice.id);
        if (invoiceItem) {
          await finalizeInvoice(data.connectedAccount, invoice.id);
          setSuccess(true);
        }
      }
    },
    [setSuccess],
  );

  useEffect(() => {
    const lineItem = lineItems?.find(
      ({ productId }) => productId === productName,
    );
    if (lineItem) {
      const newPrice = calcPrice(lineItem.amount);
      const newFee = calcFee(lineItem.fee);
      methods.setValue("price", newPrice);
      methods.setValue("fee", newFee);
      methods.trigger("price");
      const value = calcLawyerRecieves(newPrice, newFee);
      setLawyerRecieves(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productName]);

  useEffect(() => {
    if (price && fee) {
      const value = calcLawyerRecieves(price, fee);
      setLawyerRecieves(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [price, fee]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
        <Flex direction="column" gap="4">
          <Flex className={s.FieldBox}>
            <Skeleton loading={!connectedAccounts}>
              <ConnectedAccountSelect connectedAccounts={connectedAccounts} />
            </Skeleton>
          </Flex>
          {connectedAccount && (
            <Flex className={s.FieldBox} gap="4">
              <Skeleton loading={isFetching}>
                <CustomerSelect customers={customers} />
              </Skeleton>
            </Flex>
          )}
          {connectedAccount && (
            <Flex className={s.FieldBox} gap="4">
              <Skeleton loading={isFetching}>
                <ProductNameSelect products={products} />
              </Skeleton>
              <Skeleton loading={isFetching}>
                <ProductPriceField />
              </Skeleton>
              <Skeleton loading={isFetching}>
                <FeeField />
              </Skeleton>
            </Flex>
          )}
        </Flex>
        <Flex
          mt={{ initial: "4", sm: "4", md: "6" }}
          p={{ initial: "4" }}
          gap="4"
          justify="between"
          align="center"
          direction={{ initial: "column", sm: "row" }}
          className={s.Footer}
        >
          <Text size="4">
            <strong>Lawyer recieves: </strong>${lawyerRecieves}
          </Text>
          <Button
            size="4"
            type="submit"
            className={s.Submit}
            loading={methods.formState.isSubmitting}
            disabled={!methods.formState.isValid}
          >
            Create Invoice
          </Button>
        </Flex>
        {success && <Popup onClose={handleClose} />}
        {/* <DevTool control={methods.control} /> */}
      </form>
    </FormProvider>
  );
}

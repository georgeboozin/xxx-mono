import { Separator, Text, Flex } from "@radix-ui/themes";
import { Form } from "@/features/checkout-session/ui/form";
import xxxLogo from "@/assets/xxx.svg";
import s from "./checkout-session-page.module.css";

export function CheckoutSessionPage() {
  return (
    <div>
      <div className={s.Header}>
        <div className={s.HeaderItems}>
          <a href="https://xxx.com/" target="_blank">
            <img src={xxxLogo} className="logo react" alt="React logo" />
          </a>
        </div>
      </div>
      <Flex direction="column" className={s.Content}>
        <Flex direction="column" gap="4" mb={{ initial: "4" }}>
          <Text size="7">Invoice</Text>
          <Separator size="4" />
        </Flex>
        <Form />
      </Flex>
    </div>
  );
}

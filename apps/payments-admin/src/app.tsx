import { SWRConfig } from "swr";
import { Theme } from "@radix-ui/themes";
import { CheckoutSessionPage } from "@/pages/checkout-session/ui/checkout-session-page";

function App() {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      <Theme accentColor="iris" grayColor="slate">
        <CheckoutSessionPage />
      </Theme>
    </SWRConfig>
  );
}

export default App;

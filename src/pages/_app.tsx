import { type AppType } from "next/app";

import { api } from "~/utils/api";
import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import type { AppProps } from "next/app";
import { PageLayout } from "~/components/layout";

const MyApp: AppType = ({ Component, pageProps }: AppProps) => {
  return (
    <ClerkProvider {...pageProps}>
      <PageLayout {...pageProps}>
        <Component {...pageProps} />
      </PageLayout>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);

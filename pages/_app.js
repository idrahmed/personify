import { Provider } from "next-auth/client";
import { QueryClient, QueryClientProvider } from "react-query";

import "../styles/globals.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App({
  Component,
  pageProps,
}) {
  return (
    <Provider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </Provider>
  );
}

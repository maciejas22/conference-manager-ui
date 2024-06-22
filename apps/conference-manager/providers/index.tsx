import { ReactNode } from "react";

import { NextUIProvider } from "@/providers/next-ui";
import { QueryClientProvider } from "@/providers/query-client";

function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider>
      <NextUIProvider>{children}</NextUIProvider>
    </QueryClientProvider>
  );
}

export { Providers };

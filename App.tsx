import "@src/i18n/i18n";

import { BottomTabs } from "@src/features/navigation";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BottomTabs />
    </QueryClientProvider>
  );
}

import "react-native-gesture-handler";
import "@src/i18n/i18n";

import { NavigationContainer } from "@react-navigation/native";
import { navigationTheme, paperTheme } from "@src/util";
import { PaperProvider } from "react-native-paper";
import { QueryClient, QueryClientProvider } from "react-query";

import { Layout } from "./src/features/layout";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={paperTheme}>
        <NavigationContainer theme={navigationTheme}>
          <Layout />
        </NavigationContainer>
      </PaperProvider>
    </QueryClientProvider>
  );
}

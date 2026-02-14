import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainLayout from "./component/layout/MainLayout";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <MainLayout />
    </QueryClientProvider>
  );
}

export default App;

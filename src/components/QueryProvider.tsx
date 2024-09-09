"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient(); // Tạo một instance của QueryClient

type Props = {
  children: React.ReactNode; // Props cho children là một React node
};

const QueryProvider = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider> // Cung cấp QueryClientProvider với client là queryClient và các children
  );
};
export default QueryProvider;

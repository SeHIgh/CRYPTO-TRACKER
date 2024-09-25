import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";

// Create a client
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </HelmetProvider>
    </RecoilRoot>
  </React.StrictMode>
);

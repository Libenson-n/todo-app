import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoggedInUserProvider from "./context/LoggedInUserContext.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LoggedInUserProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </LoggedInUserProvider>
  </React.StrictMode>
);

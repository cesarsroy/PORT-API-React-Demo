import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import router from "./routes";
import AccessTokenBox from "./components/AccessToken";
import AccessTokenContext, {
  AccessTokenContextType,
} from "./contexts/accessTokenContext";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </StrictMode>
);

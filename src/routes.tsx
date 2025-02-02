import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import Report from "./pages/Report";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Report />,
      },
      {
        path: "/workflow",
        element: <h1>workflow</h1>,
      },
      {
        path: "/optimizer",
        element: <h1>optimizer</h1>,
      },
    ],
  },
]);

export default router;

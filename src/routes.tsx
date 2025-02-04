import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import ReportPage from "./pages/ReportPage";
import WorkflowPage from "./pages/WorkflowPage";
import OptimizerPage from "./pages/OptimizerPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <ReportPage />,
      },
      {
        path: "/workflow",
        element: <WorkflowPage />,
      },
      {
        path: "/optimizer",
        element: <OptimizerPage />,
      },
    ],
  },
]);

export default router;

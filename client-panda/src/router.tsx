import { createBrowserRouter, Navigate } from "react-router";
import App from "./App";
import { Stats } from "./components/Stats";
import SalaryCalculator from "./components/SalaryCalculator";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/stats",
    element: <Stats />,
  },
  {
    path: "/salary",
    element: <SalaryCalculator />,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
], {
  basename: "/app"
});

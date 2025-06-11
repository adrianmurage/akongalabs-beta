import { createBrowserRouter, Navigate } from "react-router";
import App from "./App";
import { Stats } from "./components/Stats";

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
    path: "*",
    element: <Navigate to="/" replace />,
  },
], {
  basename: "/app"
});
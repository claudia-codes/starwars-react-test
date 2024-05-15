import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "urql";
import { createClient } from "urql";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PersonPage from "./pages/PersonPage";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
const client = createClient({
  url: "https://swapi-graphql.netlify.app/.netlify/functions/index",
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/person/:personId",
    element: <PersonPage />,
  },
  {
    path: "/error",
    element: <ErrorPage />,
  },
]);

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Provider value={client}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);

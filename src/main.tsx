import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "urql";
import { createClient } from "urql";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PersonPage from "./pages/PersonPage";
import HomePage from "./pages/HomePage";
import "bootstrap/dist/css/bootstrap.min.css";
import { withTheme } from "@emotion/react";
const client = createClient({
  url: "https://swapi-graphql.netlify.app/.netlify/functions/index",
});

const HomePageWithTheme = withTheme(HomePage)
const PersonPageWithTheme = withTheme(PersonPage)

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePageWithTheme />,
  },
  {
    path: "/person/:personId",
    element: <PersonPageWithTheme />,
  },
]);



ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider value={client}>
        <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

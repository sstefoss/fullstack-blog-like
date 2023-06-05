import React from "react";
import ReactDOM from "react-dom/client";
import {
  ApolloClient,
  HttpLink,
  ApolloLink,
  InMemoryCache,
  concat,
  ApolloProvider,
} from "@apollo/client";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import Layout from "./Layout.tsx";

import "./index.css";

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_HASURA_GRAPHQL_ENDPOINT,
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: localStorage.getItem("token") || null,
    },
  }));

  return forward(operation);
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<App />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);

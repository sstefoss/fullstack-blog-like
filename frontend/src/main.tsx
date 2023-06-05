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

import "./index.css";

import Layout from "./Layout.tsx";
import Protected from "./Protected.tsx";

import HomePage from "./pages/Home.tsx";
import ProfilePage from "./pages/Profile.tsx";
import LoginPage from "./pages/Login.tsx";
import SignupPage from "./pages/Signup.tsx";
import EmailVerificationPage from "./pages/EmailVerification.tsx";
import PostPage from "./pages/Post.tsx";

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
            <Route path="/" element={<HomePage />} />
            <Route path="/posts/:id" element={<PostPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/email-verification"
              element={<EmailVerificationPage />}
            />
            <Route element={<Protected isSignedIn={false} />}>
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);

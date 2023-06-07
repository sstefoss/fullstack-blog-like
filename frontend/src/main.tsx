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
import { AuthContextProvider } from "@/context/auth.tsx";

import Layout from "@/Layout.tsx";
import Protected from "@/Protected.tsx";

import HomePage from "@/pages/Home.tsx";
import ProfilePage from "@/pages/Profile.tsx";
import LoginPage from "@/pages/Login.tsx";
import LogoutPage from "@/pages/Logout.tsx";
import SignupPage from "@/pages/Signup.tsx";
import EmailVerificationPage from "@/pages/EmailVerification.tsx";

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_HASURA_GRAPHQL_ENDPOINT,
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => {
    const authHeader: { authorization?: string } = {};
    const token = localStorage.getItem("token");

    if (typeof token === "string" && token.length > 0) {
      authHeader.authorization = `Bearer ${localStorage.getItem("token")}`;
    }

    return {
      headers: {
        ...headers,
        ...authHeader,
      },
    };
  });

  return forward(operation);
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/logout" element={<LogoutPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route
                path="/email-verification"
                element={<EmailVerificationPage />}
              />
              <Route element={<Protected />}>
                <Route path="/profile" element={<ProfilePage />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </ApolloProvider>
  </React.StrictMode>
);

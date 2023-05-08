import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./auth";
import LoaderProvider from "./Loader";
export const compose = (providers: any) =>
  providers.reduce((Prev: any, Curr: any) => ({ children }: any) => (
      <Prev>
          <Curr>{children}</Curr>
      </Prev>
  ));

export const RouteProviders = compose([
  // React.StrictMode,
  BrowserRouter,
  LoaderProvider,
  AuthProvider,
]);
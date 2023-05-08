import * as React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../routeProviders/auth";

export function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = React.useContext(AuthContext)
  let location = useLocation()

  if (!auth?.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
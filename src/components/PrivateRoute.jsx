import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const isAuthenticated = localStorage.getItem("arion-user");

  return isAuthenticated ? children : <Navigate to="/" />;
}
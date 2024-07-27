import { Navigate, Outlet } from "react-router-dom";
export const PrivateRoutes = () => {
  let token = localStorage.getItem("token");

  return token ? <Outlet /> : <Navigate to="/login" />;
};

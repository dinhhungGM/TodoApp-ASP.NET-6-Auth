import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  selectAuthenticated,
  validateTokenAsync,
} from "../features/Auth/AuthSlice";
import { useEffect } from "react";

const ProtectedRoute = () => {
  const dispatch = useAppDispatch();
  const authenticated = useAppSelector(selectAuthenticated);
  useEffect(() => {
    dispatch(validateTokenAsync(null));
  }, [dispatch]);
  return authenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;

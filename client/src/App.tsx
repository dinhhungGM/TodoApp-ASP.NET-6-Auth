import { Routes, Route } from "react-router-dom";

import LoginForm from "./features/Auth/LoginForm";
import RegisterForm from "./features/Auth/RegisterForm";
import Home from "./features/Home/index";
import { useAppDispatch } from "./app/hooks";
import { useEffect } from "react";
import { validateTokenAsync } from "./features/Auth/AuthSlice";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./features/Dashboard/Dashboard";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(validateTokenAsync(null));
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/dashboard" element={<ProtectedRoute />}>
        <Route path="" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;

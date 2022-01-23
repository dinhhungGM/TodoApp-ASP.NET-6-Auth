import React from "react";
import { selectAuthenticated } from "../Auth/AuthSlice";
import { useAppSelector } from "../../app/hooks";
import { Navigate } from "react-router-dom";

const Home = () => {
  const authenticated = useAppSelector(selectAuthenticated);
  return (
    <div>
      {authenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
    </div>
  );
};

export default Home;

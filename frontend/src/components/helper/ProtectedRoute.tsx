import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../app/store";

const ProtectedRoute = ({ children }) => {
  const { user } = useAppSelector((state) => state.user);

  if (user) {
    return children;
  } else if (user === null) {
    return <Navigate to="/login" />;
  } else {
    return <></>;
  }
};

export default ProtectedRoute;

import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import authAPI from "../api/authAPI.js";
import Loading from "./Loading.jsx";

function ProtectedRoute({ children }) {

  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {

    async function checkAuth() {

      try {

        await authAPI.get("/me");

        setAuthenticated(true);

      } catch (error) {

        setAuthenticated(false);

      } finally {

        setLoading(false);

      }

    }

    checkAuth();

  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!authenticated) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
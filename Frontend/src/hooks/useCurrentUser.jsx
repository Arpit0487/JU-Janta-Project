import { useEffect, useState } from "react";
import authAPI from "../api/authAPI";

function useCurrentUser() {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function fetchUser() {

      try {

        const response = await authAPI.get("/me");

        setUser(response.data.user);

      } catch (error) {

        setUser(null);

      } finally {

        setLoading(false);

      }

    }

    fetchUser();

  }, []);

  return {
    user,
    loading
  };
}

export default useCurrentUser;
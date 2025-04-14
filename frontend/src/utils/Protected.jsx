import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContextProvider";
import { useNavigate } from "react-router-dom";

function Protected({ children }) {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/"); // ✅ redirect only after render
    }
  }, [user, navigate]);

  if (!user) return null; // Or a loading spinner if needed

  return <>{children}</>;
}

export default Protected;

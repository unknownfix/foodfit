import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import authMiddleware from "@utils/authMiddleware";

const Index = () => {
  const history = useHistory();

  useEffect(() => {
    authMiddleware(history);
  });

  return <h1>Index</h1>;
};

export default Index;

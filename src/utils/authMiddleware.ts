import { History } from "history";

export default (history: History) => {
  const authToken = localStorage.getItem("AuthToken");
  if (!authToken) history.push("/login");
};

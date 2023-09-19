import { Navigate } from "react-router-dom";
import { useContextCustom } from "../context/stateContext";

const SaleCloseGuard = ({ children }) => {
    const {closeDate}=useContextCustom();

  if (!closeDate) {
    return children;
  } else {
    return <Navigate to={"/finance-daily"} />;
  }
};

export default SaleCloseGuard;

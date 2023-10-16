import { Navigate } from "react-router-dom";
import { useContextCustom } from "../context/stateContext";

const SaleCloseGuard = ({ children }) => {
    const {saleClose}=useContextCustom();

  if (saleClose===false) {
    return children;
  } else {
    return <Navigate to={"/"} />;
  }
};

export default SaleCloseGuard;
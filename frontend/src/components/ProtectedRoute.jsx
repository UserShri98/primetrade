import {useContext} from "react";
import {Navigate} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

const ProtectedRoute=({children})=>{
  const {userData}=useContext(AuthContext);

  if(!userData){
    return <Navigate to="/login"/>;
  }

  return children;
};

export default ProtectedRoute;

import {Link,useNavigate } from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";

const Navbar=()=>{
  const {userData,logoutUser}=useContext(AuthContext);
  const navigate=useNavigate();

  const handleLogout=()=>{
    logoutUser();
    navigate("/login");
  };

  return (
    <nav className="bg-black text-white px-6 py-4 flex justify-between">
      <h1 className="font-bold text-lg">Primetrade.ai</h1>

      <div className="space-x-4">
        {!userData ?(
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
    ):(
          <button onClick={handleLogout}>Logout</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

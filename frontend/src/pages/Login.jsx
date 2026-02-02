import {useState,useContext} from "react";
import {Link, useNavigate} from "react-router-dom";
import api, {setAuthToken} from "../utils/api";
import {AuthContext} from "../context/AuthContext";

const Login=()=>{
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");

  const {loginUser}=useContext(AuthContext);
  const navigate=useNavigate();

  const handleLogin=async(e)=>{
    e.preventDefault();
    setError("");

    try{
      const res=await api.post("/auth/login",{
        email,password});

      loginUser(res.data);
      setAuthToken(res.data.token);
      navigate("/dashboard");
    }catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 border p-6 rounded">
      <h2 className="text-xl font-bold mb-4">Login</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleLogin} className="space-y-4">
        <input
          className="w-full border p-2"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          className="w-full border p-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>setPassword(e.target.value)}
        />

        <button className="w-full bg-black text-white py-2">
          Login
        </button>
      </form>

      <p className="mt-4 text-sm">
        No account?{" "}
        <Link className="text-blue-500" to="/register">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;

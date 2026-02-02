import {useState} from "react";
import {Link,useNavigate } from "react-router-dom";
import api from "../utils/api";

const Register=()=>{
  const [formData,setFormData]=useState({
    name:"",
    email:"",
    password:""
  });
  const [error,setError]=useState("");
  const navigate=useNavigate();

  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
  };

  const handleRegister=async(e)=>{
    e.preventDefault();
    setError("");

    try {
      await api.post("/auth/register",formData);
      navigate("/login");
    }catch(err){
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 border p-6 rounded">
      <h2 className="text-xl font-bold mb-4">Register</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleRegister} className="space-y-4">
        <input
          className="w-full border p-2"
          name="name"
          placeholder="Name"
           onChange={handleChange}
        />
        <input
          className="w-full border p-2"
            name="email"
            placeholder="Email"
          onChange={handleChange}
        />
        <input
          className="w-full border p-2"
          name="password"
            type="password"
          placeholder="Password"
            onChange={handleChange}
        />

        <button className="w-full bg-black text-white py-2">
              Register
    </button>
      </form>

      <p className="mt-4 text-sm">
        Already have an account?{" "}
        <Link className="text-blue-500" to="/login">
     Login
            </Link>
      </p>
    </div>
  );
};

export default Register;

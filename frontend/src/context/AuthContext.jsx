import { createContext, useEffect, useState } from "react";

export const AuthContext=createContext(null);

export const AuthProvider=({children})=>{
  const [userData,setUserData]=useState(null);

  useEffect(()=>{
    const savedUser=localStorage.getItem("tasknest_user");
    if(savedUser){
      setUserData(JSON.parse(savedUser));
    }
  },[]);

  const loginUser=(data)=>{
    localStorage.setItem("tasknest_user",JSON.stringify(data));
    setUserData(data);
  };

  const logoutUser=()=>{
    localStorage.removeItem("tasknest_user");
    setUserData(null);
  };

  return (
    <AuthContext.Provider value={{userData,loginUser,logoutUser}}>
      {children}
    </AuthContext.Provider>
  );
};

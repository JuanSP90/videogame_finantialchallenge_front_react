import React from "react";
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();
  const [reload, setReload] = useState(false);

  const handleToastFail = () => {
    toast.error("Su user name , email o password no son válidos");
  };

  const getMyProfile = async () => {
    if (!window.localStorage.getItem("token")) {
      return navigate("/");
    }
    try {
      const response = await axios.get("http://localhost:3001/users/me", {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      });
      setProfile(response.data);
    } catch (error) {
      return navigate("/");
    }
  };

  const login = async (password, email) => {
    try {
      const response = await axios.post("http://localhost:3001/users/login", {
        password: password,
        email: email,
      });
      window.localStorage.setItem("token", response.data.token);
      if (response.status === 200) {
        getMyProfile();
        navigate("/Profile");
      }
    } catch (error) {
      handleToastFail();
    }
  };

  const logout = async () => {
    window.localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    getMyProfile();
  }, [reload]);

  return (
    <AuthContext.Provider
      value={{ profile, login, getMyProfile, setReload, reload, logout }}
    >
      {children}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </AuthContext.Provider>
  );
};

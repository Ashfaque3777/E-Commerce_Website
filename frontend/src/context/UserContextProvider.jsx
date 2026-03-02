import { useEffect, useState } from "react";
import userContext from "./userContext";
import axios from "axios";
import { API } from "../config";

export default function UserContextProvider({ children }) {
  let [cartList, setCartList] = useState(false);
  let [isClientLogin, setIsClientLogin] = useState(false);
  let [isAdminLogin, setIsAdminLogin] = useState(false);

  let [auth, setAuth] = useState({
    token: localStorage.getItem("token") || null,
    isAuthorized: !!localStorage.getItem("token"),
    user: "",
  });

  let clientLogin = async (data) => {
    let result = await axios.post(`${API}/api/loginClient`, data);
    if (result.data.isMatch == true) {
      let token = result.data.token;
      localStorage.setItem("token", token);
      setAuth({
        token: token,
        isAuthorized: true,
        user: result.data.result[0],
      });
      return true;
    } else {
      return false;
    }
  };

  let profile = async () => {
    let result = await axios.post(`${API}/api/verify`);
    setAuth((prevAuth) => ({ ...prevAuth, user: result.data[0] }));
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      profile();
    }
  }, []);

  let logout = () => {
    localStorage.removeItem("token");
    setAuth({ token: null, isAuthorized: false, user: "" });
  };

  return (
    <userContext.Provider
      value={{
        cartList,
        setCartList,
        isAdminLogin,
        setIsAdminLogin,
        isClientLogin,
        setIsClientLogin,
        clientLogin,
        auth,
        logout,
      }}
    >
      {children}
    </userContext.Provider>
  );
}

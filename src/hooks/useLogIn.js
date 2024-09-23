import { useState } from "react";
import { postData } from "../utils/api";

const initialState = {
  errorMessage: "",
  loading: false,
};
const APIURL = import.meta.env.VITE_API_URL;
const useLogIn = () => {
  const [loginState, setLoginState] = useState(initialState);
  const handleLogin = async (body) => {
    try {
      setLoginState((prev) => {
        return {
          ...prev,
          loading: true,
          errorMessage: "",
        };
      });
      const response = await postData(`${APIURL}/login`, body);
      setLoginState((prev) => {
        return {
          ...prev,
          loading: false,
          errorMessage: "",
        };
      });
      return response.data;
    } catch (error) {
      if (error.status == 401) {
        setLoginState((prev) => {
          return {
            ...prev,
            errorMessage: "Wrong username or password",
            loading: false,
          };
        });
      }
      if (error.status == 403) {
        setLoginState((prev) => {
          return {
            ...prev,
            errorMessage: "You are a blocked user",
            loading: false,
          };
        });
      }
      if (error.status == 500) {
        setLoginState((prev) => {
          return {
            ...prev,
            errorMessage: "Something went wrong! Try again later",
            loading: false,
          };
        });
      }
      throw error;
    }
  };
  return { loginState, handleLogin };
};

export default useLogIn;

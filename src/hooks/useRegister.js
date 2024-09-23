import { useState } from "react";
import { postData } from "../utils/api";

const initialState = {
  errorMessage: "",
  loading: false,
};
const APIURL = import.meta.env.VITE_API_URL;
const useRegister = () => {
  const [signUpState, setSignUpState] = useState(initialState);
  const handleRegister = async (body) => {
    try {
      setSignUpState((prev) => {
        return {
          ...prev,
          loading: true,
          errorMessage: "",
        };
      });
      const response = await postData(`${APIURL}/register`, body);
      setSignUpState((prev) => {
        return {
          ...prev,
          loading: false,
          errorMessage: "",
        };
      });
      return response.data;
    } catch (error) {
      if (error.status == 500) {
        setSignUpState((prev) => {
          return {
            ...prev,
            errorMessage: "Something went wrong! Try again later",
            loading: false,
          };
        });
      } else {
        setSignUpState((prev) => {
          return {
            ...prev,
            errorMessage: error.response.data.message,
            loading: false,
          };
        });
      }

      throw error;
    }
  };
  return { signUpState, handleRegister };
};

export default useRegister;

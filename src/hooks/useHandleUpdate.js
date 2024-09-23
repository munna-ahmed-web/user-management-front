import { useState } from "react";
import { updateData } from "../utils/api";

const initialState = {
  loading: false,
  errorMessage: "",
};
const APIURL = import.meta.env.VITE_API_URL;
const useHandleUpdate = () => {
  const [updateState, setUpdateState] = useState(initialState);
  const handleUpdate = async (body) => {
    try {
      setUpdateState((prev) => {
        return {
          ...prev,
          loading: true,
          errorMessage: "",
        };
      });
      const response = await updateData(`${APIURL}/users`, body);
      setUpdateState((prev) => {
        return {
          ...prev,
          loading: false,
        };
      });
    } catch (error) {
      if (error.status == 500) {
        setUpdateState((prev) => {
          return {
            ...prev,
            errorMessage: "Something went wrong! try again later",
            loading: false,
          };
        });
      } else {
        setUpdateState((prev) => {
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
  return { updateState, setUpdateState, handleUpdate };
};

export default useHandleUpdate;

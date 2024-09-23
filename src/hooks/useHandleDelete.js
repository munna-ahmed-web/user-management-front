import { useState } from "react";
import { postData, DeleteData } from "../utils/api";

const initialState = {
  loading: false,
  errorMessage: "",
};
const APIURL = import.meta.env.VITE_API_URL;
const useHandleDelete = () => {
  const [deleteState, setDeleteState] = useState(initialState);
  const handleDelete = async (selectedId = []) => {
    try {
      setDeleteState((prev) => {
        return {
          ...prev,
          loading: true,
          errorMessage: "",
        };
      });
      const response = await DeleteData(`${APIURL}/delete/bulk`, selectedId);
      setDeleteState((prev) => {
        return {
          ...prev,
          loading: false,
        };
      });
    } catch (error) {
      setDeleteState((prev) => {
        return {
          ...prev,
          loading: false,
          errorMessage: error?.data?.data?.message,
        };
      });
      throw error;
    }
  };
  return {
    deleteState,
    setDeleteState,
    handleDelete,
  };
};

export default useHandleDelete;

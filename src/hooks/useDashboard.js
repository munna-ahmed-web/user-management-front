import { useState } from "react";
import { getData } from "../utils/api";

const initialState = {
  users: [],
  loading: false,
  errorMessage: "",
};
const APIURL = import.meta.env.VITE_API_URL;
const useDashboard = () => {
  const [userState, setUserState] = useState(initialState);
  const [selectedIds, setSelectedIds] = useState([]);
  const fetchUsers = async () => {
    try {
      setUserState((prev) => {
        return {
          ...prev,
          loading: true,
          errorMessage: "",
        };
      });
      const response = await getData(`${APIURL}/users`);
      setUserState((prev) => {
        return {
          ...prev,
          loading: false,
          users: response.data.data,
        };
      });
    } catch (error) {
      if (error.status == 404) {
        setUserState((prev) => {
          return {
            ...prev,
            loading: false,
            errorMessage: "Please log in first to get data",
          };
        });
      } else {
        setUserState((prev) => {
          return {
            ...prev,
            loading: false,
            errorMessage: "Something went wrong! Try again later",
          };
        });
      }
    }
  };
  const handleChange = (e) => {
    const { name, checked } = e.target;
    const selectedId = parseInt(name);

    if (name == "selectAll") {
      let allusers = userState.users.map((user) => {
        return {
          ...user,
          isChecked: checked,
        };
      });
      setUserState((prev) => {
        return {
          ...prev,
          users: allusers,
        };
      });
      if (checked) {
        const selectedArr = userState.users.map((user) => user.id);
        setSelectedIds(selectedArr);
      } else {
        setSelectedIds([]);
      }
    } else {
      let tempUser = userState.users.map((user) => {
        return user.id == selectedId ? { ...user, isChecked: checked } : user;
      });
      setUserState((prev) => {
        return {
          ...prev,
          users: tempUser,
        };
      });
      if (checked) {
        if (!selectedIds.includes(selectedId)) {
          setSelectedIds((prev) => [...prev, selectedId]);
        }
      } else {
        const filteredArray = selectedIds.filter((item) => {
          if (item !== parseInt(selectedId)) {
            return item;
          }
        });
        setSelectedIds(filteredArray);
      }
    }
  };

  return {
    userState,
    setUserState,
    fetchUsers,
    handleChange,
    selectedIds,
    setSelectedIds,
  };
};

export default useDashboard;

import axios from "axios";

export const getData = (url) => {
  const token = localStorage.getItem("token");
  try {
    const response = axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const postData = (url, body) => {
  const token = localStorage.getItem("token");
  try {
    const response = axios.post(url, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateData = async (url, body) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.patch(url, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const DeleteData = (url, selectedIds) => {
  const token = localStorage.getItem("token");
  try {
    const response = axios.delete(url, {
      data: selectedIds,
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

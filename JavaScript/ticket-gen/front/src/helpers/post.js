import axios from "axios";

const url = "http://localhost:3008/api/v1/users";

export const post = async (data) => {
  const response = await axios.post(url, data);

  return response.data;
};

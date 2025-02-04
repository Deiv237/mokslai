import axios from "axios";

const url = "http://localhost:3008/api/v1/users";

export const getAll = async () => {
  const response = await axios.post(url);

  return response.data;
};

export const getById = async (id) => {
    const response = await axios.get(`${url}/${id}`);

    return response.data
}

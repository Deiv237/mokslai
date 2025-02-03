import axios from "axios";

const url = "http://localhost:3002/api/v1/cart"

export const getById = async (id) => {
    const response = await axios.get(`${url}/${id}`);

    return response.data
}

export const getAllUsers = async () => {
    const response = await axios.get(url);

    return response.data;
}
import axios from "axios";

const url = "http://localhost:3002/api/v1/cart"

export const post = async (data) => {
    const response = await axios.post(url, data);

    return response.data
}
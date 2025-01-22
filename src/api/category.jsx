import axios from "axios";

export const createCategory = async (token, form) => {
    return axios.post('http://localhost:5001/category', form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listCategory = async () => {
    return axios.get('http://localhost:5001/category', {
    })
}

export const removeCategory = async (token, id) => {
    return await axios.delete('http://localhost:5001/category/' + id, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
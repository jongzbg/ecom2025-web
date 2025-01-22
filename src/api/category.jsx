import axios from "axios";

export const createCategory = async (token, form) => {
    return axios.post('https://ecom2025-nine.vercel.app/category', form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listCategory = async () => {
    return axios.get('https://ecom2025-nine.vercel.app/category', {
    })
}

export const removeCategory = async (token, id) => {
    return await axios.delete('https://ecom2025-nine.vercel.app/category/' + id, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
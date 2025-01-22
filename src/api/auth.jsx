import axios from "axios";


export const currentUser = async (token) => await axios.post('https://ecom2025-nine.vercel.app/current-user', {}, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const currentAdmin = async (token) => {
    return await axios.post('https://ecom2025-nine.vercel.app/current-admin', {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
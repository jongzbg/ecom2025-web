import axios from "axios";

export const createUserCart = async (token, cart) => {
    return axios.post('https://ecom2025-nine.vercel.app/user/cart', cart, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listUserCart = async (token) => {
    return axios.get('https://ecom2025-nine.vercel.app/user/cart', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const saveAddress = async (token, address) => {
    return axios.post('https://ecom2025-nine.vercel.app/user/address', { address }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const saveOrder = async (token, payload) => {
    return axios.post('https://ecom2025-nine.vercel.app/user/order', payload, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
export const getOrders = async (token) => {
    return axios.get('https://ecom2025-nine.vercel.app/user/order', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}




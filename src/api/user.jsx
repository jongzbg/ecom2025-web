import axios from "axios";

export const createUserCart = async (token, cart) => {
    return axios.post('http://localhost:5001/user/cart', cart, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listUserCart = async (token) => {
    return axios.get('http://localhost:5001/user/cart', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const saveAddress = async (token, address) => {
    return axios.post('http://localhost:5001/user/address', { address }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const saveOrder = async (token, payload) => {
    return axios.post('http://localhost:5001/user/order', payload, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
export const getOrders = async (token) => {
    return axios.get('http://localhost:5001/user/order', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}




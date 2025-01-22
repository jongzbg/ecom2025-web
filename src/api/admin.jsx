import axios from 'axios'

export const getOrdersAdmin = async (token) => {
    return await axios.get('https://ecom2025-nine.vercel.app/admin/orders/', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const changeOrderStatus = async (token, orderId, orderStatus) => {
    return await axios.put('https://ecom2025-nine.vercel.app/admin/order-status', {
        orderId, orderStatus,
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const changeUserStatus = async (token, value) => {
    return await axios.post('https://ecom2025-nine.vercel.app/change-status', value, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const changeUserRole = async (token, value) => {
    return await axios.post('https://ecom2025-nine.vercel.app/change-role', value, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const getListAllUser = async (token) => {
    return await axios.get('https://ecom2025-nine.vercel.app/users', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}


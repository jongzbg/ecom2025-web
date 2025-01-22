import axios from 'axios'

export const getOrdersAdmin = async (token) => {
    return await axios.get('http://localhost:5001/admin/orders/', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const changeOrderStatus = async (token, orderId, orderStatus) => {
    return await axios.put('http://localhost:5001/admin/order-status', {
        orderId, orderStatus,
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const changeUserStatus = async (token, value) => {
    return await axios.post('http://localhost:5001/change-status', value, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const changeUserRole = async (token, value) => {
    return await axios.post('http://localhost:5001/change-role', value, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const getListAllUser = async (token) => {
    return await axios.get('http://localhost:5001/users', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}


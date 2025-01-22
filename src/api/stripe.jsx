import axios from "axios";


export const paymentAPI = async (token) => 
    await axios.post('http://localhost:5001/user/create-payment-intent', {}, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

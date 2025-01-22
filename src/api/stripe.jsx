import axios from "axios";


export const paymentAPI = async (token) => 
    await axios.post('https://ecom2025-nine.vercel.app/user/create-payment-intent', {}, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

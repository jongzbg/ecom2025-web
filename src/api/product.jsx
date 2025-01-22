import axios from "axios";

export const createProduct = async (token, form) => {
    return axios.post('https://ecom2025-nine.vercel.app/product', form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listProduct = async (count = 20) => {
    return axios.get('https://ecom2025-nine.vercel.app/products/' + count)
}

export const readProduct = async (token, id) => {
    return axios.get('https://ecom2025-nine.vercel.app/product/' + id, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const deleteProduct = async (token, id) => {
    return axios.delete('https://ecom2025-nine.vercel.app/product/' + id, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const updateProduct = async (token, id, form) => {
    return axios.put('https://ecom2025-nine.vercel.app/product/' + id, form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const removeProduct = async (token, id) => {
    return await axios.delete('https://ecom2025-nine.vercel.app/product/' + id, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const uploadFiles = async (token, form) => {
    console.log('form api frontend', form)
    return axios.post('https://ecom2025-nine.vercel.app/images', {
        image: form
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const removeFiles = async (token, public_id) => {
    // console.log('form api frontend', form)
    return axios.post('https://ecom2025-nine.vercel.app/removeimages', {
        public_id
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const searchFilters = async (arg) => {
    return axios.post('https://ecom2025-nine.vercel.app/search/filters', arg)
}

export const listProductBy = async (sort, order, limit) => {
    return axios.post('https://ecom2025-nine.vercel.app/productby',
        {
            sort, order, limit,
        }
    )
}


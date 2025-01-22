
//Zustand
import axios from 'axios'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { listCategory } from '../api/category'
import { listProduct, searchFilters } from '../api/product'
import _ from 'lodash'

const ecomStore = (set, get) => ({
    //key:value
    user: null,
    token: null,
    categories: [],
    products: [],
    carts: [],
    logout: () => {
        set({
            user: null,
            token: null,
            categories: [],
            products: [],
            carts: [],
        })
    },
    actionAddtoCart: (product) => {
        const carts = get().carts
        const updateCart = [...carts, { ...product, count: 1 }]

        // Step Uniqe
        const uniqe = _.unionWith(updateCart, _.isEqual)
        set({ carts: uniqe })
    },
    actionUpdateQuantity: (productId, newQuqntity) => {
        // console.log('Update click', productId, newQuqntity)
        set((state) => ({
            carts: state.carts.map((item, index) =>
                item.id === productId
                    ? { ...item, count: Math.max(1, newQuqntity) }
                    : item
            )
        }))

    },
    actionRemoveProduct: (productId) => {
        // console.log('remove', productId)
        set((state) => ({
            carts: state.carts.filter((item) =>
                item.id != productId
            )
        }))
    },
    getTotalPrice: () => {
        return get().carts.reduce((total, item) => {
            return total + item.price * item.count
        }, 0)
    },
    actionLogin: async (form) => {
        console.log('action login from ecom')     
        const res = await axios.post('https://ecom2025-nine.vercel.app/login', form)
        // console.log(res.data.token)
        set({
            user: res.data.payload,
            token: res.data.token
        })
        return res
    },
    getCategory: async () => {
        try {
            const res = await listCategory()
            // console.log(res)
            // setCategories(res.data)
            set({ categories: res.data })
        } catch (err) {
            console.log(err)
        }
    },
    getProduct: async (count) => {
        try {
            const res = await listProduct(count)
            // console.log(res)
            // setCategories(res.data)
            set({ products: res.data })
        } catch (err) {
            console.log(err)
        }
    },
    actionSearchFilters: async (arg) => {
        try {
            const res = await searchFilters(arg)
            // console.log(res)
            // setCategories(res.data)
            set({ products: res.data })
        } catch (err) {
            console.log(err)
        }
    },
    clearCart: () => {
        set({ carts: [] })
    }
})

const usePersist = {
    name: 'ecom-store',
    storage: createJSONStorage(() => localStorage)
}

const useEcomStore = create(persist(ecomStore, usePersist))

export default useEcomStore
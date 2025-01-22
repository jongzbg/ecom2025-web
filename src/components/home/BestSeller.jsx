import React, { useEffect, useState } from 'react'
import { listProductBy } from '../../api/product'
import ProductCard from '../card/ProductCard'
import SwiperShowProduct from '../../util/SwiperShowProduct'
import { SwiperSlide } from 'swiper/react'

const BestSeller = () => {
    const [data, setData] = useState([])

    const loadData = () => {
        listProductBy('sold', 'desc', 10)
            .then((res) => {
                // console.log(res)
                setData(res.data)
            })
            .catch((err) => console.log(err))
    }

    console.log(data)

    useEffect(() => {
        loadData()
    }, [])



    return (

        <SwiperShowProduct>
            {
                data?.map((item, index) =>
                    <SwiperSlide>
                        <ProductCard key={index} item={item} />
                    </SwiperSlide>
                )
            }

        </SwiperShowProduct>
    )
}

export default BestSeller
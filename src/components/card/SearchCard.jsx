import React, { useEffect, useState } from 'react'
import useEcomStore from '../../store/ecom-store'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { numberFormat } from '../../util/numberFormat';

const SearchCard = () => {

    const getProduct = useEcomStore((state) => state.getProduct)
    const products = useEcomStore((state) => state.products)
    const actionSearchFilters = useEcomStore((state) => state.actionSearchFilters)
    const getCategory = useEcomStore((state) => state.getCategory)
    const categories = useEcomStore((state) => state.categories)

    const [text, setText] = useState('')
    const [categorySelected, setcategorySelected] = useState([])
    const [price, setPrice] = useState([1000, 30000])
    const [ok, SetOk] = useState(false)


    useEffect(() => {
        getCategory()
    }, [])



    // console.log(text)

    // Step 1 Search Text
    useEffect(() => {
        const delay = setTimeout(() => {
            if (text) {
                actionSearchFilters({ query: text })
            } else {
                getProduct()
            }
        }, 300)

        return () => clearTimeout(delay)
    }, [text])


    // Step 2 Search Category
    const handleCheck = (e) => {
        const inCheck = e.target.value  // checked
        const inState = [...categorySelected]  // [1,2,3] arr empty
        const findCheck = inState.indexOf(inCheck)  // i not found will return -1

        if (findCheck === -1) {
            inState.push(inCheck)  // add
        } else {
            inState.splice(findCheck, 1) // delete
        }
        setcategorySelected(inState)
        // console.log(inState)
        if (inState.length > 0) {
            actionSearchFilters({ category: inState })
        } else {
            getProduct()
        }
    }
    // console.log(categorySelected)

    // Step 3 Search by Price
    useEffect(() => {
        actionSearchFilters({ price })
    }, [ok])
    const handlePrice = (value) => {
        console.log(value)
        setPrice(value)
        setTimeout(() => {
            SetOk(!ok)
        }, 300);
    }



    return (
        <div>
            <h1 className='text-xl font-bold mb-4'>ค้นหาสินค้า</h1>
            {/* Search by Text */}
            <input
                onChange={(e) => setText(e.target.value)}
                type="text"
                className='border rounded-md w-full mb-4 px-2'
                placeholder='ค้นหาสินค้า...'
            />
            <hr />

            {/* Search by Category */}
            <div>
                <h1 className='text-lg font-bold'>หมวดหมู่สินค้า</h1>
                <div>
                    {
                        categories.map((item, index) =>
                            <div key={index} className='flex gap-2'>
                                <input
                                    type="checkbox"
                                    value={item.id}
                                    onChange={handleCheck}
                                    name=""
                                    id="" />
                                <label>{item.name}</label>
                            </div>

                        )
                    }
                </div>
            </div>

            <hr />
            {/* Search by price */}
            <div>
                <h1 className='text-lg font-bold'>ค้นหาราคา</h1>
                <div>
                    <div className='flex justify-between'>
                        <span>Min : {numberFormat(price[0])}</span>
                        <span>Max : {numberFormat(price[1])}</span>
                    </div>

                    <Slider
                        onChange={handlePrice}
                        range
                        min={0}
                        max={100000}
                        defaultValue={[1000, 30000]}
                    />
                </div>
            </div>
        </div>
    )
}

export default SearchCard
// rafce
import React from 'react'
import ContentCorousel from '../components/home/ContentCarousel'
import BestSeller from '../components/home/BestSeller'
import NewProduct from '../components/home/NewProduct'

const Home = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        <ContentCorousel />

        <p className='text-2xl text-center my-4'>Best Seller</p>
        <BestSeller />

        <p className='text-2xl text-center my-4'>New Product</p>
        <NewProduct />
      </h1>
    </div>
  )
}

export default Home
import React, { useEffect, useState } from 'react'
import Heading from '@/components/Store/Heading'
import StoreItem from '@/components/Store/Products/StoreItem'

import ProductDataService from '../../services/product.services'

import items from '@/constants/store'

export default function StorePage() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = async () => {
    const data = await ProductDataService.getAllProducts()
    setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  }

  return (
    <div className="flex flex-col items-center justify-center px-4 py-32">
      <Heading />
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-8 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>

          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map((item) => {
              return (
                <StoreItem
                  route={`/store/${item.name.toLowerCase()}`}
                  name={item.name}
                  price={item.price}
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

import React,{ useEffect } from 'react'
import { fatchProducts } from '../../redux/actions/productAction'
import {useDispatch, useSelector} from 'react-redux'
import Product from './Product'


function ProductList() {

  const products = useSelector(state => state.allProducts.products)

  const dispatch = useDispatch()

  useEffect(()=> {
    dispatch(fatchProducts())
  },[])

  return (
    <div>
        <Product></Product>
    </div>
  )
}

export default ProductList
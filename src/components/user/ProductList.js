import React,{ useEffect, useState,} from 'react'
import { fatchProducts, removeProductList } from '../../redux/actions/productAction'
import {useDispatch, useSelector} from 'react-redux'
import Product from './Product'


function ProductList() {

  const [page, setPage] = useState(1);

  const totalProducts = useSelector((state)=>state.allProducts.total)

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(fatchProducts( page , 10));
    return () => dispatch(removeProductList());
  },[])
  
  const handleScroll = () => {
    if (window.innerHeight + Math.round(document.documentElement.scrollTop) !== document.documentElement.offsetHeight) {
      return
    }
      const nextPage = page + 1; 
      dispatch(fatchProducts( nextPage , 10))
      setPage(nextPage)      
  };

  useEffect(()=> {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  },[page])

  return (
    <div>
        <Product></Product>
    </div>
  )
}

export default ProductList
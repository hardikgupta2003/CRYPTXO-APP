import React, { useState } from 'react'
import AliceCarousel from 'react-alice-carousel'
import { CryptoState } from '../../CryptoContext';



const Carousel = () => {
    const [trending,setTrending]=useState([]);
    const {currency,symbol}=CryptoState();

    
  return (
    <div>
        <AliceCarousel/>
    </div>
  )
}

export default Carousel
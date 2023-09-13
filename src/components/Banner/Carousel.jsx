import React, { useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel'
import { CryptoState } from '../../CryptoContext';
import axios from 'axios';
import { TrendingCoins } from '../../config/api';
import { makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { numberWithCommas } from '../CoinsTable';



const Carousel = () => {
    const [trending,setTrending]=useState([]);
    const {currency,symbol}=CryptoState();

    const fetchTrendingCoins = async () => {
        const { data } = await axios.get(TrendingCoins(currency));
    
        console.log(data);
        setTrending(data);
      };
    

    useEffect(()=>{
        fetchTrendingCoins();

    },[currency]);

    const useStyles=makeStyles((theme)=>({
        carousel: {
            height: "50%",
            display: "flex",
            alignItems: "center",
            
          },
          carouselItem: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
            textTransform: "uppercase",
            color: "white",
          },
    }));

    const classes= useStyles();
    const items=trending.map((coin)=>{
        let profit = coin?.price_change_percentage_24h>=0;

        return (
            <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
            <img 
            src={coin?.image}
            alt={coin.name}
            height="80"
            style={{
                marginBottom:10
            }}
            />
            <span>{coin?.symbol}
            
            <span
            style={{
                color:profit>0 ? "rgb(14,203,129)" : "red",
                fontWeight:500,
            }}
            >
                {profit && "+"}
                {coin?.price_change_percentage_24h?.toFixed(2)}%
            </span>
            </span>
            <span style={{ fontSize: 22, fontWeight: 500 }}>
                {symbol}
                {
                    numberWithCommas(coin?.current_price.toFixed(2))
                }
            </span>
            </Link>
        )
    });

    const responsive={
    0:
    {items:2,},
    512:{
        items:4,
    },
    };
  return (
    <div className="flex h-[50%] items-center">
        <AliceCarousel
         mouseTracking
         infinite
         autoPlayInterval={1000}
         animationDuration={1500}
         disableDotsControls
         disableButtonsControls
         responsive={responsive}
         items={items}
         autoPlay
        />
    </div>
  );
};

export default Carousel;
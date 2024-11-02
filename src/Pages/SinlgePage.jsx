import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LineChart from '../Components/LineChart';
import { useCrypto } from '../context/Crypto';

const SinglePage = () => {
  const { id } = useParams();  // Destructure 'id' from useParams
  const [singleCoinData, setSingleCoinData] = useState(null); // Use 'null' for initial state
  const [historicalData,setHistoricalData] = useState([])
  let {currency} = useCrypto();

  // Fetch single coin data by id
  const fetchSingleCoin = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': 'CG-M4CZQ4NoSRip2rRbWaeZ9qW6',
      },
    };
    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`, options);
      const result = await response.json();
      setSingleCoinData(result);
    } catch (error) {
      console.error('Error fetching coin data:', error);
    }
  };
// fetching historical data 
const chartData = async  ()=>{
  const options = {
    method: 'GET',
    headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-M4CZQ4NoSRip2rRbWaeZ9qW6'}
  };
  
   const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, options);
      const result = await res.json();
      setHistoricalData(result);
      console.log(historicalData);
      
      
}
  useEffect(() => {
    fetchSingleCoin(); // Call the function once component mounts
    chartData();
  }, [id,currency]);

  if (!singleCoinData) {
    return <div className='w-full flex flex-col h-screen items-center justify-center space-y-8 text-white bg-gradient-to-b from-gray-800 to-black p-6'>
    <div className="flex items-center space-x-4">
      {/* Spinner Icon */}
      <svg className="w-8 h-8 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
      </svg>
      {/* Loading Text */}
      <span className="text-2xl">Loading...</span>
    </div>
  </div>
  
  }

  return (
    <section className="w-full flex flex-col items-center space-y-8 text-white bg-gradient-to-b from-gray-800 to-black p-6">
      {/* Coin image and name */}
      <div className="flex flex-col items-center space-y-2">
        <img src={singleCoinData.image?.large} alt={singleCoinData.name} className="w-20 h-20" />
        <h1 className="text-4xl font-bold uppercase">
          {singleCoinData.name} ({singleCoinData.symbol?.toUpperCase()})
        </h1>
      </div>

      {/* Placeholder for historical chart */}
        {/* Historical chart will go here */}
        <LineChart historicalData={historicalData}/>

      {/* Coin details */}
      <ul className="w-full max-w-2xl space-y-5">
        <li className="flex justify-between items-center border-b border-gray-600 py-2">
          <span>Crypto Market Rank</span>
          <span className="font-semibold">{singleCoinData.market_cap_rank}</span>
        </li>
        <li className="flex justify-between items-center border-b border-gray-600 py-2">
          <span>Current Price</span>
          <span className="font-semibold">{currency.symbol} {singleCoinData.market_data?.current_price[currency.name]}</span>
        </li>
        <li className="flex justify-between items-center border-b border-gray-600 py-2">
          <span>Market Cap</span>
          <span className="font-semibold">{currency.symbol} {singleCoinData.market_data?.market_cap[currency.name].toLocaleString()}</span>
        </li>
        <li className="flex justify-between items-center border-b border-gray-600 py-2">
          <span>24 Hour High</span>
          <span className="font-semibold">{currency.symbol} {singleCoinData.market_data?.high_24h[currency.name]}</span>
        </li>
        <li className="flex justify-between items-center py-2">
          <span>24 Hour Low</span>
          <span className="font-semibold">{currency.symbol} {singleCoinData.market_data?.low_24h[currency.name]}</span>
        </li>
      </ul>
    </section>
  );
};

export default SinglePage;

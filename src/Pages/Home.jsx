import React, { useState, useEffect } from 'react';
import { useCrypto } from '../context/Crypto';
import { Link } from 'react-router-dom';

const Home = () => {
  // using custom hook to get the coins data
  const { coins,currency } = useCrypto();
  const [input, setInput] = useState('');
  const [displayedCoins, setDisplayedCoins] = useState([]); // State for coins to display

  useEffect(() => {
    // Initialize displayedCoins with the first 10 coins
    setDisplayedCoins(coins.slice(0, 10));
  }, [coins,input]);

  // adding search functionality
  const searchCoin = (e) => {
    e.preventDefault();
    
    if (input.trim() === '') {
      // Reset to default top 10 coins if input is empty
      setDisplayedCoins(coins);
    } else {
      const filterCoins = coins.filter((coin) =>
        coin.name.toLowerCase().includes(input.toLowerCase())
      );
      // Update displayed coins with the filtered results
      setDisplayedCoins(filterCoins.length > 0 ? filterCoins : coins);
    }
  };

  return (
    <section className='flex flex-col gap-10 my-10 items-center text-white px-4'>
      <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-wide text-center">
        Largest Crypto Marketplace
      </h1>
      <p className='font-medium italic text-center max-w-lg text-gray-200'>
        Explore the latest cryptocurrency prices and trends. Stay informed with real-time data for all your crypto needs.
      </p>

      {/* Search Bar */}
      <form className='bg-white w-full sm:w-3/4 md:w-1/2 py-3 px-4 flex justify-between items-center rounded-lg shadow-lg' onSubmit={searchCoin}>
        <input
          type="text"
          className='w-full text-black font-semibold border-none rounded-lg py-2 px-4 outline-none'
          placeholder='Search for a cryptocurrency...'
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <button
          className='ml-3 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition duration-200 font-semibold'
          type='submit' // This ensures the button submits the form
        >
          Search
        </button>
      </form>

      {/* Crypto List */}
      <div className='w-full  sm:w-3/4 md:w-1/2 grid grid-cols-1'>
        {displayedCoins && displayedCoins.length > 0 ? (
          displayedCoins.slice(0,10).map((coin, index) => (
           <Link   key={coin.id} to={`/coin/${coin.id}`}>
            <div
            
              className='cursor-pointer bg-gray-800 text-white p-5 border-b border-b-slate-100 shadow-lg flex items-center justify-between duration-200 hover:bg-gray-900'
              >
              <div className='flex items-center '>
                <span className='font-bold text-lg mr-4 text-gray-400'>{coin.market_cap_rank}</span>
                <img src={coin.image} alt={coin.name} className='w-10 h-10 mr-4 rounded-full' />
                <div className='flex flex-col'>
                  <span className='font-semibold'>{coin.name}</span>
                  <span className='text-sm text-gray-400 uppercase'>{coin.symbol}</span>
                </div>
              </div>
              <div className='text-right'>
                <p className='font-semibold text-lg'>{currency.symbol} {coin.current_price.toFixed(2)}</p>
                <p
                  className={`font-medium ${coin.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}
                >
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </p>
                <p className='text-sm text-gray-400'>Mkt Cap: {currency.symbol} {coin.market_cap.toLocaleString()}</p>
              </div>
            </div>
              </Link>
          ))
        ) : (
          <div className='text-center py-4 text-gray-300'>
            Fetching data
          </div>
        )}
      </div>
    </section>
  );
};

export default Home;

import { useState, useContext, createContext, useEffect } from "react";

// Create the context
export const cryptoContext = createContext();

// Custom hook for consuming the context
export const useCrypto = () => {
  return useContext(cryptoContext);
};

// Provider component
export const CryptoProvider = ({ children }) => {
  const [coins, setCoins] = useState([]);
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$"
  });

  // Function to get all coins
  const getAllCoins = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-M4CZQ4NoSRip2rRbWaeZ9qW6"
      }
    };

    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
        options
      );
      const result = await response.json();
      setCoins(result);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect to get all the coins whenever `currency.name` changes
  useEffect(() => {
    getAllCoins();
  }, [currency]);

  return (
    <cryptoContext.Provider value={{currency,coins,setCoins,setCurrency}}>
      {children}
    </cryptoContext.Provider>
  );
};

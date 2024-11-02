import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { useCrypto } from "../context/Crypto";

function LineChart({ historicalData }) {
  const [data, setData] = useState([['Date', 'Price']]);
  const { currency } = useCrypto();

  useEffect(() => {
    if (historicalData.prices) {
      const dataCopy = [['Date', 'Price']];

      historicalData.prices.forEach(item => {
        const date = new Date(item[0]); // Convert timestamp to Date object
        const price = item[1]; // Price value
        dataCopy.push([date, price]); // Push date and price as separate elements
      });

      setData(dataCopy); // Update the data state
    }
  }, [historicalData]);

  return (
    <div className="w-full flex justify-center"> {/* Center the chart */}
      <Chart
        className="w-[20rem] sm:w-[25rem] md:w-[40rem] lg:w-[50rem]" // Set widths for different screen sizes
        chartType="LineChart"
        height="18rem"
        data={data}
        options={{
          hAxis: { title: 'Date' },
          vAxis: { title: 'Price' },
          legend: 'none',
          chartArea: { width: '80%', height: '70%' } // Adjust chart area
        }}
      />
    </div>
  );
}

export default LineChart;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BusinessByCityChart = () => {
  const [cityData, setCityData] = useState({ labels: [], counts: [] });

  useEffect(() => {
    const fetchBusinessData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/businesses");
        const businesses = response.data;

        // Group businesses by city
        const cityCount = {};
        businesses.forEach(business => {
          const cityName = business.city_id?.name || "Unknown";
          cityCount[cityName] = (cityCount[cityName] || 0) + 1;
        });

        // Prepare data for the chart
        const labels = Object.keys(cityCount);
        const counts = Object.values(cityCount);
        setCityData({ labels, counts });
      } catch (error) {
        console.error("Error fetching business data:", error);
      }
    };

    fetchBusinessData();
  }, []);

  // Chart configuration
  const data = {
    labels: cityData.labels,
    datasets: [
      {
        label: "Number of Businesses",
        data: cityData.counts,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Number of Businesses by City",
      },
    },
  };

  return (
    <div className="w-full max-w-4xl mx-auto  ml-16 mt-4 h-[350px] bg-white p-6 rounded-lg shadow-lg">
      {/* <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Businesses by City</h2> */}
      <Bar data={data} options={options} />
    </div>
  );
};

export default BusinessByCityChart;

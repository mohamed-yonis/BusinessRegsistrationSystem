// src/components/BusinessStatusChart.jsx
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"; 

// Register the required components for Doughnut chart
ChartJS.register(ArcElement, Tooltip, Legend);

const BusinessStatusChart = () => {
  const [data, setData] = useState({
    labels: ["Approved", "Pending"],
    datasets: [
      {
        label: "Business Status",
        data: [0, 0],
        backgroundColor: ["#4CAF50", "#FF9800"], // Colors for Approved and Pending
        hoverBackgroundColor: ["#66BB6A", "#FFB74D"],
      },
    ],
  });

  useEffect(() => {
    // Fetch the count of approved and pending businesses
    const fetchBusinessCounts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/businesses/count-by-status");
        setData({
          labels: ["Approved", "Pending"],
          datasets: [
            {
              label: "Business Status",
              data: [response.data.approved, response.data.pending],
              backgroundColor: ["#4CAF50", "#FF9800"],
              hoverBackgroundColor: ["#66BB6A", "#FFB74D"],
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching business counts:", error);
      }
    };

    fetchBusinessCounts();
  }, []);

  return (
    <div className="w-full max-w-md mx-auto mt-6">
      <h2 className="text-2xl font-semibold text-center mb-4">Business Status</h2>
      <Doughnut data={data} />
    </div>
  );
};

export default BusinessStatusChart;

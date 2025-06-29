import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    if (chrome?.storage?.local) {
      chrome.storage.local.get(null, data => {
        const labels = Object.keys(data);
        const values = Object.values(data).map(t => Math.floor(t / 60));

        setChartData({
          labels,
          datasets: [
            {
              label: "Time Spent (min)",
              data: values,
              backgroundColor: "rgba(75,192,192,0.6)",
            }
          ]
        });
      });
    }
  }, []);

  return (
    <div>
      <h3>Productivity Chart</h3>
      <Bar data={chartData} />
    </div>
  );
};

export default Dashboard;

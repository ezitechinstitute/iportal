import React, { useState, useEffect, useRef } from "react";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PerformanceChart = () => {
  const id = sessionStorage.getItem("eziId");
  const [average, setAverage] = useState(null);
  const chartRendered = useRef(false); // 🔒 Prevent chart re-rendering

  useEffect(() => {
    // Fetch only once when id is present
    if (!id || chartRendered.current) return;

    const fetchAverage = async () => {
      try {
        const res = await axios.get("https://api.ezitech.org/get-int-avg", {
          params: { id },
        });
        const avg = Number(res.data?.final_average ?? 0);
        setAverage(isNaN(avg) ? 0 : avg);
        chartRendered.current = true; // ✅ Stop any future updates
      } catch {
        setAverage(0);
        chartRendered.current = true;
      }
    };

    fetchAverage();
  }, [id]);

  if (average === null) {
    return <h3 style={{ textAlign: "center" }}>Loading chart...</h3>;
  }

  // Static data — no re-renders
  const data = {
    datasets: [
      {
        data: [average, 100 - average],
        backgroundColor: ["#6E3AFF", "#E2E8F0"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "80%",
    animation: false, // ⛔ Disable animation
    plugins: {
      tooltip: { enabled: false },
      legend: { display: false },
    },
  };

  return (
    <div style={{ width: 300, margin: "auto", textAlign: "center" }}>
      <Doughnut data={data} options={options} redraw={false} />
      <h3
        style={{
          marginTop: "-130px",
          fontSize: "24px",
          color: "#6E3AFF",
          position: "relative",
        }}
      >
        {average}%
      </h3>
      <p>Performance</p>
    </div>
  );
};

export default React.memo(PerformanceChart);

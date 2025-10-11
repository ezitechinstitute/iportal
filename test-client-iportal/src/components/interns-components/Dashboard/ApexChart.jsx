import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  PolarAngleAxis,
} from "recharts";

const ApexChart = () => {
  const id = sessionStorage.getItem("eziId");
  const [average, setAverage] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const fetchAverage = async () => {
      try {
        const res = await axios.get("https://api.ezitech.org/get-int-avg", {
          params: { id },
        });
        const avg = Number(res.data?.final_average ?? 0);
        if (isMounted) setAverage(isNaN(avg) ? 0 : avg);
      } catch (err) {
        console.error("Error fetching average:", err);
        if (isMounted) setAverage(0);
      }
    };
    if (id) fetchAverage();
    return () => (isMounted = false);
  }, [id]);

  const data = [
    {
      name: "Performance",
      value: average,
      fill: "#6E3AFF",
    },
  ];

  return (
    <div style={{ width: "100%", height: 300, position: "relative" }}>
      {!average ? (
        <h4 style={{textAlign: "center"}}>Load Progress...</h4>
      ) : (
        <>
          <ResponsiveContainer>
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="70%"
              outerRadius="100%"
              barSize={20}
              data={data}
              startAngle={270} // start from left
              endAngle={180 - (360 * average) / 100} // 👈 calculate exact fill angle
            >
              <PolarAngleAxis
                type="number"
                domain={[0, 100]}
                angleAxisId={0}
                tick={false}
              />
              <RadialBar
                background
                dataKey="value"
                cornerRadius={50}
                clockWise
              />
            </RadialBarChart>
          </ResponsiveContainer>
          {/* // Center Text */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
            }}
          >
            <h3 style={{ margin: 0, color: "#6E3AFF", fontSize: "26px" }}>
              {average}%
            </h3>
            <p style={{ margin: 0, color: "#64748B" }}>Progress</p>
          </div>
        </>
      )}
    </div>
  );
};

export default ApexChart;

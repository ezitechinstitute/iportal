import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

const ApexChart = () => {
  const checkLoggedIn = sessionStorage.getItem("isLoggedIn");
  const id = sessionStorage.getItem("eziId");

  const [average, setAverage] = useState(0); // Default to 0 to prevent issues

  const [options, setOptions] = useState({
    chart: {
      height: 350,
      type: 'radialBar',
      offsetY: -10,
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        dataLabels: {
          name: {
            fontSize: '16px',
            offsetY: 120,
          },
          value: {
            offsetY: 76,
            fontSize: '22px',
            formatter: function (val) {
              return val + "%";
            },
          },
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        shadeIntensity: 0.15,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 65, 91],
      },
    },
    stroke: {
      dashArray: 4,
    },
    labels: ['Completed Projects'],
  });

  const getInternAverage = async () => {
    try {
      const response = await axios.get(`http://localhost:8088/get-int-avg`, { params: { id } });
      const finalAvg = response.data?.final_average ?? 0; // Ensure a valid value
      setAverage(finalAvg);
    } catch (error) {
      console.error("Error fetching avg:", error);
      setAverage(0); // Handle error case
    }
  };

  useEffect(() => {
    getInternAverage();
  }, [id]); // Only run when `id` changes

  return (
    <div id="chart">
      <ReactApexChart options={options} series={[average]} type="radialBar" height={450} width={550} />
    </div>
  );
};

export default ApexChart;

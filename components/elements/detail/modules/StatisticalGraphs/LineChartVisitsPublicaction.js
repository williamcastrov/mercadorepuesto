// components/LineChart.js
import React from "react";
import { Line } from "react-chartjs-2";

function LineChartVisitsPublicaction({ chartData }) {
  return (
    <div className="chart-container">
      <div className="titulograficapost">Visitas de la publicación</div>
      <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: false,
              text: "Users Gained between 2016-2020"
            },
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
  );
}
export default LineChartVisitsPublicaction;
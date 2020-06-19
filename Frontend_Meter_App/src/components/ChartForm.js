import React from "react";
import { Line } from "react-chartjs-2";


export default function ChartForm(props) {
    const data1 = props.chartdata;

    const data = {
      labels: data1.map(d => d.ReadingDateTimeUTC),
      backgroundColor: ['rgba(255,0,0,1)'],
      lineTension: 1,
      datasets: [
        {
          label: "WH",
          fill: false,
          borderColor: "rgba(255, 0, 0, 0.3)",
          borderWidth: 1,
          pointRadius: 4,
          data: data1.map(i=>i.WH)
        },
        {
          label: "VARH",
          fill: false,
          borderColor: "rgba(0, 255, 0, 0.3)",
          borderWidth: 1,
          pointRadius: 4,
          data: data1.map(l=>l.VARH)
        }
      ]
    };

    var options = {
      legend: {
        position: "right",
        labels: {
          boxWidth: 10
        }
      },
      scales: {
        xAxes: [
          {
            ticks: { display: false }
          }
        ]
      }
    };

    return (
      <div className="Chart" style={{"fontFamily": "sans-serif","textAlign": "center"}}>
        <h1>Meter Data In Chart</h1>
        <Line data={data} options={options} />
      </div>
    );
  }

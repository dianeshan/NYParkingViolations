import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CanvasJSReact from './canvasjs.react';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

interface MonthOfYear {
  Month: String;
  Percentage: Number;
}

interface DataPoint {
  label: String;
  y: Number;
}

function BarChartMOYS() {
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/featuremonth/data/monthviolations${window.location.search}`
      )
      .then((resp) => {
        const data = resp.data;

        const mappedData = data.map((x: MonthOfYear) => ({
          label: x['Month'],
          y: x['Percentage'],
        }));
        setDataPoints(mappedData);
      });
  }, []);

  const options = {
    title: {
      text: 'Frequencies of Violations by Month',
    },
    axisX: {
      interval: 1,
    },
    axisY: {
      minimum: 0,
    },
    data: [
      {
        type: 'column',
        dataPoints: dataPoints,
      },
    ],
  };
  const containerProps = {
    height: '700px',
    wight: '200px',
  };

  return (
    <div className="barchart">
      <CanvasJSChart
        containerProps={containerProps}
        options={options}
      ></CanvasJSChart>
    </div>
  );
}

export default BarChartMOYS;

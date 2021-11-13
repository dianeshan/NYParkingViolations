import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CanvasJSReact from './canvasjs.react';
import { Modal, Button} from 'react-bootstrap';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

interface ViolationCount {
  ViolationCode: Number;
  Percentage: Number;
}

interface DataPoint {
  label: String;
  y: Number;
}

function PieChartVC(props: any) {
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/feature1/data/violationcount${window.location.search}`
      )
      .then((resp) => {
        const data = resp.data;

        const mappedData = data.map((x: ViolationCount) => ({
          label: 'Violation ' + x['ViolationCode'],
          y: x['Percentage'],
        }));
        setDataPoints(mappedData);
      });
  }, []);

  const options = {
    exportEnabled: true,
    animationEnabled: true,
    // title: {
    //     text: 'Most Common Types of Violations',
    // },
    data: [
      {
        type: 'pie',
        startAngle: 75,
        toolTipContent: '<b>{label}</b>: {y}%',
        showInLegend: 'true',
        legendText: '{label}',
        indexLabelFontSize: 16,
        indexLabel: '{label} - {y}%',
        dataPoints: dataPoints,
      },
    ],
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Most Common Types of Violations
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="piechart">
          <CanvasJSChart options={options}></CanvasJSChart>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PieChartVC;

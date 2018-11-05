import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { withRouter } from 'react-router-dom';

class DoughnutGraph extends React.Component {
  render() {

    const data = {
      labels: [
        'Red',
        'Orange',
        'Yellow',
        'Green',
        'Blue',
        'Violet',
      ],
      datasets: [{
        data: [300, 50, 100],
        backgroundColor: [
          '#d50000',
          '#F57C00',
          '#FBC02D',
          '#388e3c',
          '#1976d2',
          '#7b1fa2',
        ],
        hoverBackgroundColor: [
          '#d50000',
          '#F57C00',
          '#FBC02D',
          '#388e3c',
          '#1976d2',
          '#7b1fa2',
        ],
      }],
    };

    return (
        <div>
          <h3>Doughnut Example</h3>
          <Doughnut data={data} />
        </div>
    );
  }
}

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(DoughnutGraph);

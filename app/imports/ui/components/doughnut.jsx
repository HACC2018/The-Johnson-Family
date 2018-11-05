import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { withRouter } from 'react-router-dom';

class DoughnutGraph extends React.Component {
  render() {

    const data = {
      labels: [
        'Red',
        'Green',
        'Yellow',
      ],
      datasets: [{
        data: [300, 50, 100],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
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

import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { withRouter } from 'react-router-dom';

class DoughnutGraph extends React.Component {
  render() {

    const styles = {
      textAlign: 'center',
      textDecoration: 'underline',
    };

    const data = {
      labels: [
        'Manoa',
        'West Oahu',
        'Kapiolani',
      ],
      datasets: [{
        data: [300, 50, 100],
        backgroundColor: [
          '#3fba5a',
          '#026245',
          '#ace1af',
        ],
        hoverBackgroundColor: [
          '#3fba5a',
          '#026245',
          '#ace1af',
        ],
      }],
    };

    return (
        <div>
          <h3 style={styles}>Campus Data</h3>
          <Doughnut data={data} />
        </div>
    );
  }
}

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(DoughnutGraph);

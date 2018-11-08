import React from 'react';
import { Line } from 'react-chartjs-2';
import { withRouter } from 'react-router-dom';

class LineGraph extends React.Component {
  render() {

    const styles = {
      textAlign: 'center',
      textDecoration: 'underline',
    };

    const data = {
      labels: ['Spring 17', 'Fall 17', 'Spring 18', 'Fall 18'],
      datasets: [
        {
          label: 'By Semester',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(2,98,69,0.4)',
          borderColor: 'rgba(2,98,69,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(2,98,69,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [65, 59, 80, 81, 56, 55, 40],
        },
      ],
    };

    return (
        <div>
          <h3 style={styles}>Semester Data</h3>
          <Line data={data} />
        </div>
    );
  }
}

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(LineGraph);

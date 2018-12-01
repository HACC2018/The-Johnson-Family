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
      // labels: [
      //     new Date(1535796000000),
      //     new Date(1535968800000),
      //     new Date(1536141600000),
      //     new Date(1536314400000),
      //     new Date(1536400800000),
      //     new Date()
      // ],
      // labels: [
      //   new Date(2018, 9, 1),
      //   new Date(2018, 10, 1),
      //   new Date(2018, 11, 1),
      //   new Date(2018, 12, 1),
      // ],
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
          // data: [65, 59, 80, 81, 56, 55, 40],
          data: this.props.data,
        },
      ],
    };
    const options = {
        scales: {
          xAxes: [{
            type: 'time',
            scaleLabel: {
              display: true,
              labelString: 'Date',
            },
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'value',
            },
          }],
        },
    };

    // const data = {
    //     labels: [
    //         new Date(1535796000000),
    //         new Date(1535968800000),
    //         new Date(1536141600000),
    //         new Date(1536314400000),
    //         new Date(1536400800000),
    //         new Date()
    //     ],
    //     datasets: [{
    //       label: 'My First dataset',
    //       fill: false,
    //       data: [65, 59, 80, 81, 56, 55, 40],
    //     }, {
    //       label: 'My Second dataset',
    //       fill: false,
    //       data: [65, 59, 80, 81, 56, 55, 40],
    //     }, {
    //       label: 'Dataset with point data',
    //       fill: false,
    //       data: [
    //         { x: new Date(1535796000000), y: 65 },
    //         { x: new Date(1535968800000), y: 59 },
    //         { x: new Date(1536141600000), y: 80 },
    //         { x: new Date(1536314400000), y: 81 },
    //         { x: new Date(1536400800000), y: 56 },
    //         { x: new Date(), y: 55 },
    //       ],
    //     }]
    //   };
    // const options = {
    //     title: {
    //       text: 'Chart.js Time Scale'
    //     },
    //     scales: {
    //       xAxes: [{
    //         type: 'time',
    //         time: {
    //           parser: 'MM/DD/YYYY HH:mm',
    //           // round: 'day'
    //           tooltipFormat: 'll HH:mm'
    //         },
    //         scaleLabel: {
    //           display: true,
    //           labelString: 'Date'
    //         }
    //       }],
    //       yAxes: [{
    //         scaleLabel: {
    //           display: true,
    //           labelString: 'value'
    //         }
    //       }]
    //     },
    //   };

    return (
        <div>
          <h3 style={styles}>Semester Data</h3>
          <Line data={data} options={options}/>
        </div>
    );
  }
}

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(LineGraph);

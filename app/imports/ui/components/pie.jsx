import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Dropdown } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

class PieGraph extends React.Component {
  render() {

    const styles = {
      textAlign: 'center',
    };

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

    const campusOptions = [
      {
        text: 'UH Manoa',
        value: 'UH Manoa',
      },
      {
        text: 'UH West Oahu',
        value: 'UH West Oahu',
      },
    ];

    return (
        <div>
          <h3 style={styles}>Pie Example</h3>
          <Dropdown placeholder='Select Campus' fluid selection options={campusOptions} />
          <Pie data={data}/>
        </div>
    );
  }
}

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(PieGraph);

import React from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import { withRouter } from 'react-router-dom';
import * as db from '../../api/Wrapper/Wrapper';


class BarGraph extends React.Component {
  render() {

    const styles = {
      textAlign: 'center',
      textDecoration: 'underline',
    };

    const data = {
      labels: ['Paper', 'Plastic', 'Glass', 'Metals', 'Organics'],
      datasets: [
        {
          label: 'Categories',
          backgroundColor: 'rgba(63,186,90,0.2)',
          borderColor: 'rgba(63,186,90,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(63,186,90,0.4)',
          hoverBorderColor: 'rgba(63,186,90,1)',
          data: db.getCategoryValues(),
        },
      ],
    };

    return (
        <div>
          <h3 style={styles}>Waste Categories</h3>
          <HorizontalBar data={data} />
        </div>
    );
  }
}

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(BarGraph);

import React from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import { withRouter } from 'react-router-dom';

class BarGraph extends React.Component {
  render() {
    const inputData = this.props.data;
    console.log(inputData);
    const labelArr = Object.keys(inputData).map((id) => inputData[id].label);
    const dataArr = Object.keys(inputData).map((id) => inputData[id][this.props.field]);
    console.log(labelArr);
    console.log(dataArr);

    const styles = {
      textAlign: 'center',
      textDecoration: 'underline',
    };

    const data = {
      labels: labelArr,
      datasets: [
        {
          label: 'Categories',
          backgroundColor: 'rgba(63,186,90,0.2)',
          borderColor: 'rgba(63,186,90,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(63,186,90,0.4)',
          hoverBorderColor: 'rgba(63,186,90,1)',
          data: dataArr,
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

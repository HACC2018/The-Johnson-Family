import React from 'react';
import { Pie, HorizontalBar, Line } from 'react-chartjs-2';
import { Grid, Header, Button } from 'semantic-ui-react';

export default class BackgroundBar extends React.Component {
  render() {

    const data = {
      datasets: [{
        data: [300, 50, 100],
        backgroundColor: [
          '#ace1af',
          '#3fba5a',
          '#026245',
        ],
        hoverBackgroundColor: [
          '#ace1af',
          '#3fba5a',
          '#026245',
        ],
      }],
    };

    const data2 = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
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

    const data3 = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          backgroundColor: 'rgba(63,186,90,0.2)',
          borderColor: 'rgba(63,186,90,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(63,186,90,0.4)',
          hoverBorderColor: 'rgba(63,186,90,1)',
          data: [65, 59, 80, 81, 56, 55, 40],
        },
      ],
    };

    const headerStyle = {
      fontSize: '40px',
      color: 'white',
      paddingTop: '80px',
      paddingBottom: '80px',
    };

    const pStyle = {
      fontSize: '20px',
      color: 'white',
    };

    const gridStyle = {
      paddingRight: '100px',
    };

    return (
        <div className='background-bar'>
          <Grid container textAlign='center' verticalAlign='middle'>
            <Grid.Row>
            </Grid.Row>
            <Grid.Row>
            </Grid.Row>
            <Grid.Row>
              <Header as='h1' style={headerStyle}>
                IN-DEPTH DATA RETRIEVAL
              </Header>
            </Grid.Row>

            <Grid.Row columns={3}>
              <Grid.Column fluid>
                <Line style={gridStyle} data={data2} />
              </Grid.Column>
              <Grid.Column fluid>
                <Pie style={gridStyle} data={data}/>
              </Grid.Column>
              <Grid.Column fluid>
                <HorizontalBar style={gridStyle} data={data3} />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={3} fluid>
              <Grid.Column>
                <p style={pStyle}>Through waste audits, community members can contribute to the cause and provide
                  valuable data that can be analyzed to draw important conclusions and provide a basis to incite change
                  at the legislative level.
                </p></Grid.Column>
              <Grid.Column>
                <p style={pStyle}>Features a robust, easily-accessible database in the cloud, a submission form
                  providing a streamlined, delegated approach to data entry, and a compelling selection of
                  visualizations that accurately convey the implications in the data
                </p></Grid.Column>
              <Grid.Column>
                <p style={pStyle}>Built with the future in mind. The web app will use MongoDB and the JavaScript
                  framework Meteor
                  with Semantic UI React, simplifying the process of designing and deploying a clean, intuitive app.
                  Always open source and free.
                </p></Grid.Column>
            </Grid.Row>
            <Grid.Row>
            </Grid.Row>
            <Grid.Row>
            </Grid.Row>
            <Grid.Row>
              <Button color='white' size='massive'>
                EXPLORE DATA
              </Button>
            </Grid.Row>
          </Grid>
        </div>
    );
  }
}

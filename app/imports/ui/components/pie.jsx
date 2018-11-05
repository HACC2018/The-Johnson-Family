import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Grid, Dropdown, Button, Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { GPalette } from './GPalette.js';

class PieGraph extends React.Component {
  render() {
    const styles = {
      textAlign: 'center',
      textDecoration: 'underline',
    };

    const styles2 = {
      padding: '5px',
    };

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
        }
    ;

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

    const buildingOptions = [
      {
        text: 'Sinclair Library',
        value: 'Sinclair Library',
      },
      {
        text: 'Hamilton Library',
        value: 'Hamilton Library',
      },
    ];

    return (
        <div>
          <h3 style={styles}>Pie Example</h3>
          <Grid>
            <Grid.Row centered>
              <Button basic color='green'><Dropdown text='Select Campus'
                                                    options={campusOptions}/></Button>
              <Icon color='green' name='long arrow alternate right' style={styles2}/>
              &nbsp;<Button disabled basic color='green'><Dropdown text='Select Building'
                                                                   options={buildingOptions}/></Button>
            </Grid.Row>
          </Grid>
          <Pie data={data}/>

        </div>
    );
  }
}

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(PieGraph);

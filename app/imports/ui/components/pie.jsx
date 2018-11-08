import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Grid, Dropdown, Button, Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import * as Palette from './PaletteConstants';
import * as db from '../../api/Wrapper/Wrapper';

class PieGraph extends React.Component {
  constructor(){
    super(props);
    this.getCampusId(this) = this.getCampusId(this);
  }


  getCampusId = (event, {value}) => {
    console.log(value)
    let id_name = e.target.textContent;
    console.log(id_name);
  }
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
        'Green',
        'Yellow',
      ],
      datasets: [{
        data: [300, 50, 100],
        backgroundColor: [
          Palette.graph.main1,
          Palette.graph.main2,
          Palette.graph.main3,
        ],
        hoverBackgroundColor: [
          '#ace1af',
          '#3fba5a',
          '#026245',
        ],
      }],
    };

    const campusOptions = db.getCollection(1);

    const buildingOptions = db.getBuildingNamesByLocation();

    return (
        <div>
          <h3 style={styles}>Building Data</h3>
          <Grid>
            <Grid.Row centered>
              <Button basic color='green' onClick={this.db.getBuildingIdsByLocation()} ><Dropdown text='Select Campus'
                                                    options={campusOptions} /></Button>
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

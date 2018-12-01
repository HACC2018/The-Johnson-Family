import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Locations } from '/imports/api/Location/Location';
import AddLocations from '../components/AddLocations';
import ListLocations from '../components/ListLocations';


class AddListLocations extends React.Component {
  render() {

    return (
        <div>
          <Grid container divided='vertically'>
            <Grid.Row columns={2}>
              <Grid.Column>
                <AddLocations/>
              </Grid.Column>
              <Grid.Column>
                <ListLocations/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
    );
  }
}

export default AddListLocations;

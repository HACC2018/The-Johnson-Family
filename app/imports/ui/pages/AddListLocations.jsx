import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Segment } from 'semantic-ui-react';
import { Locations } from '/imports/api/Location/Location';
import { withTracker } from 'meteor/react-meteor-data';
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

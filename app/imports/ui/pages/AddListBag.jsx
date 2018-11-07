import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Segment } from 'semantic-ui-react';
import { Bags } from '/imports/api/bag/bag';
import { withTracker } from 'meteor/react-meteor-data';
import AddBag from '../components/AddBag';
import ListBag from '../components/ListBag';


class AddListBag extends React.Component {
  render() {

    return (
        <div>
          <Grid container divided='vertically'>
            <Grid.Row columns={2}>
              <Grid.Column>
                <AddBag/>
              </Grid.Column>
              <Grid.Column>
                <ListBag/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
    );
  }
}

export default AddListBag;

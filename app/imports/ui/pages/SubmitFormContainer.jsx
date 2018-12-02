import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Loader, Segment } from 'semantic-ui-react';
import { TrashBags } from '/imports/api/TrashBags/TrashBags';
import { withTracker } from 'meteor/react-meteor-data';
import AddBag from '../components/AddBag';
import ListBag from '../components/ListBag';
import PropTypes from 'prop-types';
import * as db from '../../api/Wrapper/Wrapper';

class SubmitFormContainer extends React.Component {
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {

    return (
        <div>
          <Grid container divided='vertically'>
            <Grid.Row columns={2}>
              <Grid.Column>
                <AddBag/>
              </Grid.Column>
              <Grid.Column>
                <ListBag data={db.getBagLinkedCollections(db.getCollection(db.constants.codes.trashBags))}/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
    );
  }
}

SubmitFormContainer.propTypes = {
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  const s1 = Meteor.subscribe('TrashBags');
  const s2 = Meteor.subscribe('Events');
  const s3 = Meteor.subscribe('Locations');
  const s4 = Meteor.subscribe('Buildings');
  const s5 = Meteor.subscribe('Categories');
  return {
    ready:
        s1.ready() &&
        s2.ready() &&
        s3.ready() &&
        s4.ready() &&
        s5.ready()
  };
})(SubmitFormContainer);

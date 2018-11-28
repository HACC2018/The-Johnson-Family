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
                <ListBag bags={this.props.bags}/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
    );
  }
}

SubmitFormContainer.propTypes = {
  bags: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  const subscription = Meteor.subscribe('TrashBags');
  return {
    bags: TrashBags.find({}).fetch(),
    ready: subscription.ready(),
  };
})(SubmitFormContainer);

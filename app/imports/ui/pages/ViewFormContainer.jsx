import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Loader } from 'semantic-ui-react';
import { Forms } from '/imports/api/Forms/Forms';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import ListForm from '../components/ListForm';
import * as db from '../../api/Wrapper/Wrapper';

class ViewFormContainer extends React.Component {
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {

    return (
        <div>
          <Grid container divided='vertically'>
              <Grid.Column>
                <ListForm forms={db.getCollection(db.constants.codes.forms)}/>
              </Grid.Column>
          </Grid>
        </div>
    );
  }
}

ViewFormContainer.propTypes = {
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  const s1 = Meteor.subscribe('Forms');
  return {
    forms: Forms.find({}).fetch(),
    ready:
        s1.ready(),
  };
})(ViewFormContainer);

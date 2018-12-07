import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, List, Header, Loader } from 'semantic-ui-react';
import { Locations } from '/imports/api/Locations/Locations';
import Location from '/imports/ui/components/Location';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders a table containing all of the Contacts documents. Use <Contact> to render each row. */
class ListLocations extends React.Component {
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center">List Locations</Header>
          <List divided verticalAlign='middle'>
            <List.Item>
              {this.props.locations.map((loc, index) => <Location key={index} loc={loc}/>)}
            </List.Item>
          </List>
        </Container>
    );
  }
}

/** Require an array of Contacts documents in the props. */
ListLocations.propTypes = {
  locations: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Contacts documents.
  const subscription = Meteor.subscribe('Locations');
  return {
    locations: Locations.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListLocations);

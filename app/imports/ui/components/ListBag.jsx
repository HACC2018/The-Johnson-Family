import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, List } from 'semantic-ui-react';
import { Bags } from '/imports/api/bag/bag';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Bag from '/imports/ui/components/Bag';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListBags extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center">List Bags</Header>
          <List divided verticalAlign='middle'>
            <List.Item>
              {this.props.bags.map((bag, index) => <Bag key={index} bag={bag} />)}
            </List.Item>
          </List>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListBags.propTypes = {
  bags: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Bags');
  return {
    bags: Bags.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListBags);

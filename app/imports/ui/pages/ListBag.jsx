import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Table, Button } from 'semantic-ui-react';
import { Bags } from '/imports/api/bag/bag';
import { withTracker, Link } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import BagItem from '/imports/ui/components/BagItem';


/** Renders a table containing all of the Bag documents. Use <BagItem> to render each row. */
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
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>ID</Table.HeaderCell>
                <Table.HeaderCell>Type</Table.HeaderCell>
                <Table.HeaderCell>Weight</Table.HeaderCell>
                <Table.HeaderCell>Volume</Table.HeaderCell>
                <Table.HeaderCell>Edit</Table.HeaderCell>
                <Table.HeaderCell>Delete</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.bags.map((bag) => <BagItem key={bag._id} bag={bag} />)}
            </Table.Body>
          </Table>
        </Container>
    );
  }
}

/** Require an array of Bag documents in the props. */
ListBags.propTypes = {
  bags: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Bag documents.
  const subscription = Meteor.subscribe('Bags');
  return {
    bags: Bags.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListBags);

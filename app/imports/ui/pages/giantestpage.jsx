import React from 'react';
// import { Meteor } from 'meteor/meteor';
import { Button, Container, Dropdown, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
// import PropTypes from 'prop-types';
import * as db from '../../api/Wrapper/Wrapper';


/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class giantestpage extends React.Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.deleteClick = this.deleteClick.bind(this);
  }

  deleteCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Delete failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Delete succeeded' });
    }
  }

  /* When the delete button is clicked, remove the corresponding item from the collection. */
  onClick() {
    if (db.addNewLocation("TestName1", "TestStreet1", "TestCity1", "HI", 96797)) {
      Bert.alert({ type: 'success', message: 'Insert succeeded'});
    } else {
      Bert.alert({ type: 'danger', message: 'Insert failed'});
    }
  }

  deleteClick() {
    if (db.deleteBuilding("TestName1", "TestStreet1", "TestCity1", "HI", 96797)) {
      Bert.alert({ type: 'success', message: 'Insert succeeded'});
    } else {
      Bert.alert({ type: 'danger', message: 'Insert failed'});
    }
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }


  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Button basic onClick={this.onClick}>Add TestLocation</Button>
          <Button basic onClick={this.deleteClick}>Delete TestLocation</Button>
        </Container>
    );
  }
}

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Locations');
  return {
    ready: subscription.ready(),
  };
})(giantestpage);

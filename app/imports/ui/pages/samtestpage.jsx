import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Container, Loader } from 'semantic-ui-react';
import { Locations } from '/imports/api/Locations/Locations';
import { Buildings } from '/imports/api/Buildings/Buildings';
import { Events } from '/imports/api/Events/Events';

// import Location from '/imports/ui/components/Location';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import * as db from '../../api/Wrapper/Wrapper.js';


/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class samtestpage extends React.Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.onClick2 = this.onClick2.bind(this);
    this.deleteClick = this.deleteClick.bind(this);
  }
  /** Notify the user of the results of the submit. If successful, clear the form. */
  insertCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Insert failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Insert succeeded' });
    }
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
    Events.insert({ name: "TestEvent", date: "1" }, this.insertCallback);
  }

  onClick2() {
    Events.insert({ name: "TestEvent2", date: "2" }, this.insertCallback);
  }

  deleteClick() {
    const id = this.props.event[0]._id;
    Events.remove(id, this.deleteCallback);
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    const getEvents = db.getEventNames();
    console.log({getEvents});
    // console.log(aLoc[name]);
    // TODO - implement: console.log(db.getLocationsCollection()[0]);
    console.log('events working');
    // console.log(this.props.location[0]);
    // console.log(this.props.location[1]);
    // console.log(this.props.location);
    return (this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const getEvents = db.getEventNames();
    return (
        <Container>
          {/*{this.props.location.map((location) => <Location key={location._id} location={location} />)}*/}
          {/*{this.props.location.name}*/}
          {/*<div>{getLocations}</div>*/}
          <Button basic onClick={this.onClick}>Add TestEvent</Button>
          <Button basic onClick={this.onClick2}>Add TestEvent</Button>
          <Button basic onClick={this.deleteClick}>Delete TestEvent</Button>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
samtestpage.propTypes = {
  event: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Events');
  return {
    event: Events.find({}).fetch(),
    ready: subscription.ready(),
  };
})(samtestpage);
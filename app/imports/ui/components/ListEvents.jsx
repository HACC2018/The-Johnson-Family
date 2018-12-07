import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, List, Header, Loader } from 'semantic-ui-react';
import { Events } from '/imports/api/Events/Events';
import EventItem from '/imports/ui/components/EventItem';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import * as db from '../../api/Wrapper/Wrapper';


/** Renders a table containing all of the Contacts documents. Use <Contact> to render each row. */
class ListEvents extends React.Component {
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center">List Buildings</Header>
          <List divided verticalAlign='middle'>
            <List.Item>
              {this.props.events.map((event, index) => <EventItem key={index} event={event} />)}
            </List.Item>
          </List>
        </Container>
    );
  }
}

/** Require an array of Contacts documents in the props. */
ListEvents.propTypes = {
  events: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Contacts documents.
  const s1 = Meteor.subscribe('Events');
  return {
    events: Events.find({}).fetch(),
    ready: s1.ready(),
  };
})(ListEvents);

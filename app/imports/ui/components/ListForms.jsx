import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, List } from 'semantic-ui-react';
import { Forms } from '/imports/api/Forms/Forms';
import Form from '/imports/ui/components/Form';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';


/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListForms extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center">List Forms</Header>
          <List divided verticalAlign='middle'>
            <List.Item>
              {this.props.forms.map((form) => <Form key={form._id} form={form} />)}
            </List.Item>
          </List>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListForms.propTypes = {
  forms: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Forms');
  return {
    forms: Forms.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListForms);

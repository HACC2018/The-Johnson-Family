import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, List, Header, Loader } from 'semantic-ui-react';
import { Buildings } from '/imports/api/Buildings/Buildings';
import Building from '/imports/ui/components/Building';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import * as db from '../../api/Wrapper/Wrapper';


/** Renders a table containing all of the Contacts documents. Use <Contact> to render each row. */
class ListBuildings extends React.Component {
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
              {this.props.buildings.map((building, index) => <Building
                      key={index}
                      building={building}
                      locationName={
                        db.getCollection(
                            db.constants.codes.locations,
                        ).find(event => event._id === building.location_id).name}/>)}
            </List.Item>
          </List>
        </Container>
    );
  }
}

/** Require an array of Contacts documents in the props. */
ListBuildings.propTypes = {
  buildings: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Contacts documents.
  const s1 = Meteor.subscribe('Buildings');
  const s2 = Meteor.subscribe('Locations');
  return {
    buildings: Buildings.find({}).fetch(),
    ready: s1.ready() && s2.ready(),
  };
})(ListBuildings);

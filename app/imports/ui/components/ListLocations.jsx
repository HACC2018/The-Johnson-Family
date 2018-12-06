import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, List, Header, Loader } from 'semantic-ui-react';
import Location from '/imports/ui/components/Location';
import * as db from '../../api/Wrapper/Wrapper';

/** Renders a table containing all of the Contacts documents. Use <Contact> to render each row. */
class ListLocations extends React.Component {
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (
        <Container>
          <Header as="h2" textAlign="center">List Locations</Header>
          <List divided verticalAlign='middle'>
            {/*<List.Item>*/}
              {/*{this.props.locations.map((location, index) => <Location key={index} location={db.getCollection(location._id, this.props.location)}/>)}*/}
            {/*</List.Item>*/}
          </List>
        </Container>
    );
  }
}

export default ListLocations;


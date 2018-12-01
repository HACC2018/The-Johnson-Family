import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, List } from 'semantic-ui-react';
// import { Bags } from '/imports/api/bag/bag';
import Bag from '/imports/ui/components/Bag';
import * as db from '../../api/Wrapper/Wrapper';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListBags extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {

    return (
        <Container>
          <Header as="h2" textAlign="center">List Bags</Header>
          <List divided verticalAlign='middle'>
            <List.Item>
              {this.props.data.bags.map((bag, index) => <Bag key={index}
                                                             datum={db.getBagLinkedData(bag._id, this.props.data)}/>)}
            </List.Item>
          </List>
        </Container>
    );
  }
}

export default ListBags;


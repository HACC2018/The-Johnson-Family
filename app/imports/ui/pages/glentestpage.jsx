import React from 'react';
import * as db from '../../api/Wrapper/Wrapper';
import { List, Container, Item } from 'semantic-ui-react';

class glentestpage extends React.Component {
  testFunc() {
    console.log(db.getCollection(2))
  }

  render() {
    return (
        <Container>
          <p>
            <List>
              <List.Item>Gaining Access</List.Item>
              <List.Item>Inviting Friends</List.Item>
              <List.Item>
                Benefits
                <List.List>
                  <List.Item>Rebates</List.Item>
                  <List.Item>Discounts</List.Item>
                </List.List>
              </List.Item>
              <List.Item>Warranty</List.Item>
            </List>
          </p>
          <p>X</p>
        </Container>
    );
  }
}

export default glentestpage;

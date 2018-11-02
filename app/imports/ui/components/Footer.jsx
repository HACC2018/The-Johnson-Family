import React from 'react';
import { Grid, Item, Input } from 'semantic-ui-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const celadon = {
      backgroundColor: '#ace1af',
    };
    return (
        <Item.Group relaxed style={ celadon } >
          <Grid container columns='equal' className="footer-background">
            <Grid.Column>

            </Grid.Column>

            <Grid.Column>
              <Item>
                <Item.Content>
                  <Item.Header as='h1'>NAVIGATION</Item.Header>
                  <hr/>
                  <Item.Meta>About Us</Item.Meta>
                  <Item.Meta>Videos</Item.Meta>
                  <Item.Meta>Store Locations</Item.Meta>
                </Item.Content>
              </Item>
            </Grid.Column>

            <Grid.Column>
              <Item>
                <Item.Content>
                  <Item.Header as='h1'>Main Menu</Item.Header>
                  <hr/>
                  <Item.Meta>Men</Item.Meta>
                  <Item.Meta>Women</Item.Meta>
                  <Item.Meta>Kids</Item.Meta>
                </Item.Content>
              </Item>
            </Grid.Column>

            <Grid.Column>
              <Item>
                <Item.Content>
                  <Item.Header as='h1'>Connect</Item.Header>
                  <hr/>
                  <Item.Meta>Sign up for the latest updates</Item.Meta>
                  <Item.Meta><Input action='Join' placeholder='Enter Email Address' /></Item.Meta>

                </Item.Content>
              </Item>
            </Grid.Column>

            <Grid.Column>

            </Grid.Column>
          </Grid>
        </Item.Group>
    );
  }
}

export default Footer;

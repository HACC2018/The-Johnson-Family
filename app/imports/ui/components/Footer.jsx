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
          <Grid container columns='equal' className="footer">
            <Grid.Column>
              <Item>
                <Item.Content>
                  <Item.Header as='h4'>Social Media</Item.Header>
                  <hr/>
                  <Item.Meta>Instagram</Item.Meta>
                  <Item.Meta>Facebook</Item.Meta>
                  <Item.Meta>Waste Audit</Item.Meta>
                </Item.Content>
              </Item>
            </Grid.Column>

            <Grid.Column>
              <Item>
                <Item.Content>
                  <Item.Header as='h4'>Menus</Item.Header>
                  <hr/>
                  <Item.Meta>Home</Item.Meta>
                  <Item.Meta>Dashboard</Item.Meta>
                </Item.Content>
              </Item>
            </Grid.Column>

          </Grid>
        </Item.Group>
    );
  }
}

export default Footer;

/* eslint-disable no-unused-vars,no-trailing-spaces */
import React from 'react';
import { Image, Grid, Button } from 'semantic-ui-react';
import * as Palette from './PaletteConstants';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const imgStyle = {
      width: '15%',
      height: '15%',
    };

    const divStyle = {
      paddingTop: '0px',
      backgroundColor: Palette.background.main,
      margin: '0px',
    };

    return (
        <footer style={divStyle} className='footer-background'>
          <Grid textAlign="center" verticalAlign="middle" centered>
            <Grid.Row>
            </Grid.Row>
            <Grid.Row centered>
              <a href="https://www.facebook.com/uhsustainability/">
                <Button circular icon='facebook' size='large' color='facebook'/>
              </a>
              <a href="https://twitter.com/uhsustain">
                <Button circular icon='twitter' size='large' color='twitter' margin-right='15px'/>
              </a>
              <a href="https://www.instagram.com/uhsustain/">
                <Button circular icon='instagram' size='large' color='instagram'/>
              </a>
            </Grid.Row>
          </Grid>
        </footer>
    );
  }
}

export default Footer;

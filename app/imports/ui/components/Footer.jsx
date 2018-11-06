/* eslint-disable no-unused-vars,no-trailing-spaces */
import React from 'react';
import { Image, Grid, Button } from 'semantic-ui-react';
import * as Palette from './PaletteConstants';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const imgStyle = {
      width: '200px',
      height: '60px',
      position: 'center',
    };

    const divStyle = { paddingTop: '15px', backgroundColor: Palette.background.main, margin: '0px' };
    return (
        <footer style={divStyle} verticalAlign="middle" centered>
          <div className='footer-background'>
            <Image
            src="https://cdn.discordapp.com/attachments/508521520109453314/508834015080349706/gatherwhite.png"
            style={imgStyle} centered/>
            <Grid centered>
              <Grid.Row>
              </Grid.Row>
              <Grid.Row>
              </Grid.Row>
              <Grid.Row>
              </Grid.Row>
              <Grid.Row centered>
                  <a href="https://www.facebook.com/uhsustainability/">
                    <Button circular icon='facebook' size='small' color='facebook'/>
                  </a>
                  <a href="https://twitter.com/uhsustain">
                    <Button circular icon='twitter' size='small' color='twitter' margin-right='15px'/>
                  </a>
                  <a href="https://www.instagram.com/uhsustain/">
                    <Button circular icon=' instagram' size='small' color='instagram'/>
                  </a>
              </Grid.Row>
            </Grid>
          </div>
    </footer>
    );
  }
}

export default Footer;

import React from 'react';
import { Image, Grid } from 'semantic-ui-react';

export default class Middle extends React.Component {
  render() {

    const imgStyle = {
      width: '100%',
      height: '100%',
    };

    return (
        <div className='landing-background'>
          <Grid container textAlign="center" verticalAlign="middle">
            <Grid.Row>
            </Grid.Row>
            <Grid.Row>
            </Grid.Row>
            <Grid.Row>
            </Grid.Row>
            <Grid.Row>
            </Grid.Row>
            <Grid.Row>
              <Image
                  src='https://cdn.discordapp.com/attachments/508521520109453314/508834015080349706/gatherwhite.png'
                  style={imgStyle}/>
            </Grid.Row>
          </Grid>
        </div>
    );
  }
}

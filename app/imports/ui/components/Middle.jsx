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
                  src="/images/gatherwhite.png"
                  style={imgStyle}/>
            </Grid.Row>
          </Grid>
        </div>
    );
  }
}

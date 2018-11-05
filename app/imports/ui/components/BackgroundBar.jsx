import React from 'react';
import { Button, Grid, Header, Image } from 'semantic-ui-react';

export default class BackgroundBar extends React.Component {
  render() {
    const imgStyle = {
      width: '50%',
      height: '50%',
    };

    const headerStyle = {
      fontSize: '40px',
      color: 'white',
      paddingTop: '20px',
      paddingBottom: '30px',
    };

    const pStyle = {
      fontSize: '20px',
      color: 'white',
    };

    return (
        <div className='background-bar'>
          <Grid container textAlign='center' verticalAlign='middle'>
            <Grid.Row>
            </Grid.Row>
            <Grid.Row>
            </Grid.Row>
            <Grid.Row>
              <Header as='h1' style={headerStyle}>
                WHY WE STARTED
              </Header>
            </Grid.Row>
            <Image
                src='https://cdn.discordapp.com/attachments/504615584571326464/508888460602638347/avatar.png'
                style={imgStyle}/>
            <Grid.Row>
              <p style={pStyle}>Gather is an app that helps bring together waste, people, and data. These are important
                actions that
                help administrative bodies create policies for the better health of our environment. In an ideal world,
                the exploitation of resources, the direction of investments, and the orientation of technological
                development and institutional change would all be in harmony and enhance both current and future
                potential to meet human needs and aspirations.
              </p>
              <p style={pStyle}><b>In a word: sustainable.</b></p>
            </Grid.Row>
            <Grid.Row>
              <Button color='white' size='massive'>
                LEARN MORE
              </Button>
            </Grid.Row>
          </Grid>
        </div>
    );
  }
}

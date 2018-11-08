import React from 'react';
import { Grid, Header, Image, Button } from 'semantic-ui-react';

export default class ThirdBackground extends React.Component {
  render() {
    const headerStyle = {
      fontSize: '40px',
      color: 'white',
      paddingTop: '100px',
      paddingBottom: '100px',
    };

    const imgStyle = {
      width: '30%',
      height: '30%',
    };

    return (
        <div className="third-background">
          <Grid container textAlign="center" verticalAlign="middle">
            <Grid.Row>
              <Header as="h1" style={headerStyle}>
                BUILT WITH THE FUTURE IN MIND
              </Header>
            </Grid.Row>
            <Image src="/images/mongoavatar.png" style={imgStyle}/>
            <Image src="/images/semanticavatar.png" style={imgStyle}/>
            <Image src="/images/reactavatar.png" style={imgStyle}/>
            <Grid.Row>
            </Grid.Row>
            <Grid.Row>
            </Grid.Row>
            <Grid.Row>
            </Grid.Row>
            <Grid.Row>
            </Grid.Row>
            <Grid.Row>
              <Button color='white' size='massive'>
                JOIN US
              </Button>
            </Grid.Row>
          </Grid>
        </div>
    );
  }
}

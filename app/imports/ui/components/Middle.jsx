import React from 'react';
import { Image, Grid, Header } from 'semantic-ui-react';

export default class Middle extends React.Component {
  render () {
    const gridStyle = { height: "500px" };
    return (
        <div className="landing-background">
          <Grid container textAlign="center" verticalAlign="middle" style={gridStyle} row={7}>
            <Grid.Row>
              <Image src="/images/LandingLogo.png" size="massive"/>
            </Grid.Row>
            <Grid.Row>
              <Header as="h2">
                Short message we try to spread.
              </Header>
            </Grid.Row>
            <Grid.Row>
              <Header as="h2">
                Text about our mission/DoS's mission(Title)
              </Header>
              <Header>
                Text about our mission/DoS's mission(explain)
              </Header>
            7</Grid.Row>
            <Grid.Row>
              <Header as="h2">
                Information about the waste audit
              </Header>
            </Grid.Row>
            <Grid.Row>
              <Header as="h2">
                Advertise/Call to Action(Think a title)
              </Header>
              <Header as="h2">
                Text of CTA and images/video(if possible
              </Header>
            </Grid.Row>
          </Grid>
        </div>
    );
  }
}


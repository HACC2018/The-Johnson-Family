import React from 'react';
import { Grid, Header } from 'semantic-ui-react';

export default class ThirdBackground extends React.Component {
  render() {
    const headerStyle = {
      fontSize: '40px',
      color: 'white',
      paddingTop: '80px',
    };
    return (
        <div className="third-background">
          <Grid container textAlign="center" verticalAlign="middle">
            <Grid.Row>
              <Header as="h1" style={headerStyle}>
                JOIN US.
              </Header>
            </Grid.Row>
          </Grid>
        </div>
    );
  }
}

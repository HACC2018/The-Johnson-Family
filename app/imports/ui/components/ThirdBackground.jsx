import React from 'react';
import { Grid, Header } from 'semantic-ui-react';

export default class ThirdBackground extends React.Component {
  render () {
    const gridStyle = { height: "1000px" };
    return (
        <div className="third-background">
          <Grid container textAlign="center" verticalAlign="middle" style={gridStyle} row={3}>
            <Grid.Row>
              <Header as="h2">
                Fighting to reduce greenhouse gas emissions at all of UH campuses.
              </Header>
            </Grid.Row>
            <Grid.Row>
              <Header as="h2">
                Information about the waste audit
              </Header>
            </Grid.Row>
            <Grid.Row>
              <Header as="h2">
                Pictures from 2017 Waste Audit
              </Header>
            </Grid.Row>
          </Grid>
        </div>
    );
  }
}


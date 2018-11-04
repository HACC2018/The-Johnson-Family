import React from 'react';
import { Grid, Header } from 'semantic-ui-react';

export default class BackgroundBar extends React.Component {
  render () {
    const gridStyle = { height: "100px" };
    return (
        <div className="background-bar">
          <Grid container textAlign="center" verticalAlign="middle" style={gridStyle} row={3}>
            <Grid.Row>
              <Header as="h2" inverted>
                Pictures from 2017 Waste Audit
              </Header>
            </Grid.Row>
          </Grid>
        </div>
    );
  }
}


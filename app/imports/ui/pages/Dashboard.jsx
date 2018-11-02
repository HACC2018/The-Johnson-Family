import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import StatSegment from '../components/StatSegment';
import DoughnutExample from '../components/doughnut';
import HorizontalBarExample from '../components/bar';
import LineExample from '../components/line';
import PieExample from '../components/pie';


/** A simple static component to render some text for the landing page. */
class Dashboard extends React.Component {
  render() {

    return (
        <Grid verticalAlign='middle' container divided='vertically'>
          <Grid.Row columns={6}>
            <Grid.Column>
              <StatSegment/>
            </Grid.Column>

            <Grid.Column>
              <StatSegment/>
            </Grid.Column>

            <Grid.Column>
              <StatSegment/>
            </Grid.Column>

            <Grid.Column>
              <StatSegment/>
            </Grid.Column>

            <Grid.Column>
              <StatSegment/>
            </Grid.Column>

            <Grid.Column>
              <StatSegment/>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={3}>
            <Grid.Column>
              <Segment>
                <DoughnutExample/>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <HorizontalBarExample/>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <LineExample/>
              </Segment>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={2}>
            <Grid.Column>
              <Segment>
                <PieExample />
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <PieExample />
              </Segment>
            </Grid.Column>
          </Grid.Row>

        </Grid>
    );
  }
}

export default Dashboard;

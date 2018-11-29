import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Segment } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

import * as db from '../../api/Wrapper/Wrapper';
import StatSegment from '../components/StatSegment';
import DoughnutExample from '../components/doughnut';
import ComparisonBar from '../components/bar';
import TransitionLine from '../components/line';
import PieExample from '../components/pie';


/** A simple static component to render some text for the landing page. */
class Dashboard extends React.Component {
  render() {
    const compositionData =
        db.buildCompositionData(
            db.getCollection(db.constants.codes.trashBags),
            _.pluck(db.getCollection(db.constants.codes.categories), '_id'),
            ['weight'],
            true,
        );

    // const barData = compositionData.map(function (category) {
    //   return 'hello';
    // });

    const transitData = db.formatTransitionData(compositionData, 'weight');

    return (
        <Grid verticalAlign='middle' container divided='vertically'>
          <Grid.Row columns={6}>
            <Grid.Column>
              <StatSegment
                  text={'AUDITS THIS YEAR'}
                  data={db.getCollection(db.constants.codes.events).left}
                  icon={'clipboard'}
              />
            </Grid.Column>

            <Grid.Column>
              <StatSegment text={'RECYCLABLES FOUND THIS YEAR'} data={987} icon={'recycle'}/>
            </Grid.Column>

            <Grid.Column>
              <StatSegment text={'COMPOSTABLES FOUND THIS YEAR'} data={987} icon={'leaf'}/>
            </Grid.Column>

            <Grid.Column>
              <StatSegment text={'TOTAL AUDITS'} data={987} icon={'clipboard'}/>
            </Grid.Column>

            <Grid.Column>
              <StatSegment text={'TOTAL TRACKED TRASHBAGS'} data={987} icon={'trash'}/>
            </Grid.Column>

            <Grid.Column>
              <StatSegment text={'TOTAL TRACKED WEIGHT'} data={987} icon={'weight'}/>
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
                <ComparisonBar data={compositionData}/>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <TransitionLine data={transitData}/>
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

/** Require an array of Stuff documents in the props. */
Dashboard.propTypes = {
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const s1 = Meteor.subscribe('Studies');
  const s2 = Meteor.subscribe('Categories');
  const s3 = Meteor.subscribe('Locations');
  const s4 = Meteor.subscribe('Buildings');
  const s5 = Meteor.subscribe('Events');
  const s6 = Meteor.subscribe('Forms');
  const s7 = Meteor.subscribe('TrashBags');
  return {
    ready:
        s1.ready() &&
        s2.ready() &&
        s3.ready() &&
        s4.ready() &&
        s5.ready() &&
        s6.ready() &&
        s7.ready(),
  };
})(Dashboard);

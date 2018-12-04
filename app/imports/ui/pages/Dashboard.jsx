import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Loader, Segment } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

import * as db from '../../api/Wrapper/Wrapper';
import StatSegment from '../components/StatSegment';
import CompositionDoughnut from '../components/doughnut';
import ComparisonBar from '../components/bar';
import TransitionLine from '../components/line';
import PieExample from '../components/pie';


/** A simple static component to render some text for the landing page. */
class Dashboard extends React.Component {
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }

  renderPage() {
    const trashBags = db.getCollection(db.constants.codes.trashBags);
    const events = db.getCollection(db.constants.codes.events);
    const categories = db.getCollection(db.constants.codes.categories);
    const compositionData =
        db.buildCompositionData(
            trashBags,
            _.pluck(categories, '_id'),
            ['weight'],
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
                  data={events.length}
                  icon={'clipboard'}
              />
            </Grid.Column>

            <Grid.Column>
              <StatSegment text={'RECYCLABLES FOUND THIS YEAR'} data={'-'} icon={'recycle'}/>
            </Grid.Column>

            <Grid.Column>
              <StatSegment text={'COMPOSTABLES FOUND THIS YEAR'} data={'-'} icon={'leaf'}/>
            </Grid.Column>

            <Grid.Column>
              <StatSegment text={'TOTAL AUDITS'} data={events.length} icon={'clipboard'}/>
            </Grid.Column>

            <Grid.Column>
              <StatSegment text={'TOTAL TRACKED TRASHBAGS'} data={trashBags.length} icon={'trash'}/>
            </Grid.Column>

            <Grid.Column>
              <StatSegment text={'TOTAL TRACKED WEIGHT'}
                           data={_.reduce(trashBags, (memo, bag) => memo + bag.weight, 0)}
                           icon={'weight'}/>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={3}>
            <Grid.Column>
              <Segment>
                <CompositionDoughnut
                    data={
                      db.buildCompositionData(
                          trashBags,
                          _.pluck(_.filter(categories, c => c.parent_id === '0'), '_id'),
                          ['weight'],
                      )}
                    field={'weight'}
                />
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <ComparisonBar data={compositionData} field={'weight'}/>
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

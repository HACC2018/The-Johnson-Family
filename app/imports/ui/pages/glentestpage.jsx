import React from 'react';
import { Meteor } from 'meteor/meteor';
import { List, Container, Loader, Button } from 'semantic-ui-react';

import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
// import { Buildings } from '../../api/Buildings/Buildings';
import { TrashBags } from '../../api/TrashBags/TrashBags';
import * as db from '../../api/Wrapper/Wrapper';

import TransitionLine from '../components/line';
import CompositionDoughnut from '../components/doughnut';
import ComparisonBar from '../components/bar';


//Sun's Test
import { Categories } from '../../api/Categories/Categories';
import DropdownListCategory from '../components/DropdownListCategory';


class glentestpage extends React.Component {

  onClickAll() {
    db.generateRandomData(1, true, false, true, true);
  }

  onClickNewRoot() {
    db.generateRandomData(1, false, true);
  }

  onClickBags() {
    db.generateRandomData(db.randNum(1, 8));
  }

  onClickDeleteAll() {
    return confirm('Are you sure you want to delete all data?') ? db.clearAllDocumentsAllCollections() : 0;
  }

  onClickConsole() {
    // const val = 42;
    // const obj1 = { _id: 1, a: 1, b: 2 };
    // let obj2 = { _id: 2, c: 3, d: 4 };
    // obj2 = { val, ...obj1, ...obj2 };
    // // const obj3 = { val, ...obj1, ...obj2 };
    // console.log(obj2);
    // console.log(
    //     db.join(
    //         db.getCollection(db.constants.codes.trashBags),
    //         'event_id',
    //         '_id',
    //         db.getCollection(db.constants.codes.events),
    //     ),
    // );
    console.log(db.formatTransitionData());
    // console.log(db.getCollection(db.constants.codes.trashBags));
    // console.log(_.pluck(db.getCollection(db.constants.codes.categories), '_id'));
    // console.log(db.getEarliestDate());
    // console.log(db.getLatestDate());
    // console.log((
    //         db.buildCompositionData(
    //             db.getCollection(db.constants.codes.trashBags),
    //             _.pluck(db.getCollection(db.constants.codes.categories), '_id'),
    //             ['weight'],
    //         )
    //     ));
    // console.log(
    //     db.formatTransitionData(
    //         db.buildCompositionData(
    //             db.getCollection(db.constants.codes.trashBags),
    //             _.pluck(db.getCollection(db.constants.codes.categories), '_id'),
    //             ['weight'],
    //         ),
    //         'weight',
    //     ),
    // );
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }

  renderPage() {
    const bagArray = this.props.bags;
    if (bagArray.length === 0) {
      this.onClickNewRoot();
    }
    // const data = [
    //   { x: new Date(1535796000000), y: 65 },
    //   { x: new Date(1535968800000), y: 59 },
    //   { x: new Date(1536141600000), y: 80 },
    //   { x: new Date(1536314400000), y: 81 },
    //   { x: new Date(1536400800000), y: 56 },
    //   { x: new Date(), y: 55 },
    // ];


    return (
        <Container>
          <List>
            <List.Item>Gaining Access</List.Item>
            <List.Item>Inviting Friends</List.Item>
            <List.Item>
              Benefits
              <List.List>
                <List.Item>Rebates</List.Item>
                <List.Item>Discounts</List.Item>
              </List.List>
            </List.Item>
            <List.Item>Warranty</List.Item>
            <List.Item>
              <Button content={'Display data in console'} onClick={this.onClickConsole}/>
              <Button
                  content={'Create new data in every collection'}
                  onClick={this.onClickAll}
              />
              <Button content={'Create new root category'} onClick={this.onClickNewRoot}/>
              <Button
                  content={'Create random bags only'}
                  onClick={this.onClickBags}
              />
              <Button content={'DELETE ALL DATA'} negative onClick={this.onClickDeleteAll}/>
            </List.Item>
          </List>
          {/* <List> */}
          {/* <List.Item content={this.props.buildings.length}/> */}
          {/* {this.props.buildings.map((building) => <List.Item key={building._id} content={building.name} />)} */}
          {/* </List> */}
          <List>
            <List.Item content={`Bags in database: ${bagArray.length}`}/>
            {/* {bagArray.map((building) => <List.Item key={building._id} content={building.weight}/>)} */}
          </List>
          <CompositionDoughnut
              data={
                db.buildCompositionData(
                    this.props.bags,
                    _.pluck(db.getCollection(db.constants.codes.categories), '_id'),
                    ['weight'],
                )
              }
              field={'weight'}
          />
          <ComparisonBar
              data={
                db.buildCompositionData(
                    this.props.bags,
                    _.pluck(db.getCollection(db.constants.codes.categories), '_id'),
                    ['weight'],
                )
              }
              field={'weight'}
          />
           <TransitionLine data={db.formatTransitionData()}/>
          <p>X</p>

          //Sun's Test
          <DropdownListCategory options={categoryOptions}/>

        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
glentestpage.propTypes = {
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
    bags: TrashBags.find({}).fetch(),
    ready:
        s1.ready() &&
        s2.ready() &&
        s3.ready() &&
        s4.ready() &&
        s5.ready() &&
        s6.ready() &&
        s7.ready(),
  };
})(glentestpage);

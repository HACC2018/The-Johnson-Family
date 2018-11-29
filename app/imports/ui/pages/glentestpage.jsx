import React from 'react';
import * as db from '../../api/Wrapper/Wrapper';
import { List, Container, Item, Loader, Select, Dropdown } from 'semantic-ui-react';

import { Buildings } from '../../api/Buildings/Buildings';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

import TransitionLine from '../components/line';

import { Categories } from '../../api/Categories/Categories';
import { Locations } from '../../api/Locations/Locations';
import { Events } from '../../api/Events/Events';
import DropdownListCategory from '../components/DropdownListCategory';
import DropdownListLocation from '../components/DropdownListLocation';
// import DropdownListEvent from '../components/DropdownListEvent';


class glentestpage extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }

  renderPage() {
    const bagArray = db.getCollection(db.constants.codes.trashBags);
    const categoryArray = db.getCollection(db.constants.codes.categories);
    const locationArray = db.getCollection(db.constants.codes.locations);
    const buildingArray = db.getCollection(db.constants.codes.buildings);
    const eventArray = db.getCollection(db.constants.codes.events);
    // const options = [{
    //   text: categoryArray.map((category.name)),
    //   value: categoryArray.map((category._id)),
    // }];


    const data = [
      { x: new Date(1535796000000), y: 65 },
      { x: new Date(1535968800000), y: 59 },
      { x: new Date(1536141600000), y: 80 },
      { x: new Date(1536314400000), y: 81 },
      { x: new Date(1536400800000), y: 56 },
      { x: new Date(), y: 55 },
    ]

    // const nowDate = new Date();
    // const form_id = db.addNewForm(nowDate);
    // const category_id = db.addNewCategory('newRootCat' + db.randNum().toString(), 0);
    // const study_id = db.addNewStudy(('testStudy' + db.randNum().toString()), _.pluck(db.getCollection(db.constants.codes.categories), '_id'), db.getEarliestDate());
    // const location_id = db.addNewLocation('testLoc' + db.randNum().toString(), db.randNum().toString() + 'Street St.', 'Honolulu', 'HI', '96817');
    // const building_id = db.addNewBuilding('Testing Hall ' + db.randNum().toString(), location_id);
    // const event_id = db.addNewEvent('testEvent' + db.randNum().toString(), nowDate);
    // const bag_id = db.addNewTrashBag(
    //     event_id,
    //     building_id,
    //     location_id,
    //     category_id,
    //     form_id,
    //     db.randNum(), db.randNum(), db.randNum(), db.randNum()
    // )
    console.log((
        db.buildCompositionData(
            db.getCollection(db.constants.codes.trashBags),
            _.pluck(db.getCollection(db.constants.codes.categories), '_id'),
            ['weight'],
            true
        )
    ))
    const categoryOptions = categoryArray.map( function(category) {
      let obj = {};
      obj.text = category.name;
      obj.value = category._id;
      return obj;
    });
    console.log(categoryOptions);

    const locationOptions = locationArray.map( function(location) {
      let obj = {};
      obj.text = location.name;
      obj.value = location._id;
      return obj;
    });
    console.log(locationOptions);

    const buildingOptions = buildingArray.map( function(building) {
      let obj = {};
      obj.text = building.name;
      obj.value = building._id;
      return obj;
    });
    console.log(buildingOptions);

    // const EventOptions = categoryArray.map( function(event) {
    //   let obj = {};
    //   obj.text = event.name;
    //   obj.value = event._id;
    //   return obj;
    // });
    // console.log(EventOptions);



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
            </List>
            {/*<List>*/}
              {/*<List.Item content={this.props.buildings.length}/>*/}
              {/*{this.props.buildings.map((building) => <List.Item key={building._id} content={building.name} />)}*/}
            {/*</List>*/}
            {/*<List>*/}
              {/*<List.Item content={bagArray.length}/>*/}
              {/*{bagArray.map((bag) => <List.Item key={bag._id} content={bag.weight} />)}*/}
            {/*</List>*/}


          {/*<Select placeholder='Select category'>*/}
            {/*{bagArray.map((building)) => <option key={building._id} content={building.weight} />*/}
          {/*</Select>*/}

          {/*const collec = [*/}
          {/*{*/}
            {/*_id: 234234235,*/}
            {/*name: 'paper',*/}
            {/*// ...*/}
          {/*},*/}
          {/*{*/}
            {/*_id: 43444,*/}
            {/*name: 'paper',*/}
            {/*// ...*/}
          {/*},*/}
          {/*{*/}
            {/*_id: 23562342,*/}
            {/*name: 'paper',*/}
            {/*// ...*/}
          {/*},*/}
          {/*{*/}
            {/*_id: 123566,*/}
            {/*name: 'paper',*/}
            {/*// ...*/}
          {/*},*/}

          {/*]*/}


          {/*const options=[*/}
            {/*{*/}
              {/*text: 'paper',*/}
              {/*value: 123566,*/}
            {/*}*/}
          {/*]*/}



            {/*<Dropdown selection placeholder='Category'>*/}
              {/*<Dropdown.Menu>*/}
                {/*{categoryArray.map((category) => <Dropdown.Item key={category._id} content={category.name} />)}*/}
              {/*</Dropdown.Menu>*/}
            {/*</Dropdown>*/}


          {/*<DropdownListCategory options={eventOptions}/>*/}
          <DropdownListCategory options={buildingOptions}/>
          <DropdownListCategory options={locationOptions}/>
          <DropdownListCategory options={categoryOptions}/>


            {/*<SUNSDROPDOWN collection={bagArray}/>*/}

            <TransitionLine data={
              db.formatTransitionData(
                  db.buildCompositionData(
                      db.getCollection(db.constants.codes.trashBags),
                      _.pluck(db.getCollection(db.constants.codes.categories), '_id'),
                      ['weight'],
                      true
                  ),
                  'weight'
              )
            }/>
          <p>X</p>
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
    ready:
        s1.ready() &&
        s2.ready() &&
        s3.ready() &&
        s4.ready() &&
        s5.ready() &&
        s6.ready() &&
        s7.ready()
  };
})(glentestpage);

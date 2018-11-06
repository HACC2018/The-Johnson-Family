import * as _ from 'meteor/underscore';
import { Events } from '/imports/api/Events/Events';
import { Locations } from '/imports/api/Locations/Locations';
import { Buildings } from '/imports/api/Buildings/Buildings';
import { TrashBags } from '/imports/api/TrashBags/TrashBags';
import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/*
  We need to fetch data for three types of charts: Composition, Comparison, and Transition.
  We will assume that Composition charts are Bar charts, Comparison chart
*/

class Wrapper extends React.Component {

  /**
   * Returns a Cursor pointer to the specified collection.
   * @param collection the collection to retrieve a Cursor pointer from.
   * @returns {*} a Cursor pointer to the specified collection.
   */
   getCollection(collection) {
    return collection.find({});
  }

  /**
   * Returns the Location names.
   * @param index By default, index is -1. This indicates that we want to return ALL Location names. This default value can be invoked in the Front-End side, by simply doing getLocationNames() without any parameters supplied.
   * @returns {*} either ALL Location names or the Location name at index position.
   */
  static getLocationNames(index = -1) {
    let result = [];
    const cursor = this.getCollection(Locations);
    /* Iterate over the Cursor and get the document's 'name' values. */
    cursor.forEach((doc) => result.push(doc.name));
    if (index === -1) {
      return result;
    }
    return result[index];
  }

  /**
   * Returns the Building names.
   * @param index By default, index is -1. This indicates that we want to return ALL Location names. This default value can be invoked in the Front-End side, by simply doing getBuildingNames() without any parameters supplied.
   * @returns {*} either ALL Building names or the Building name at index position.
   */
  static getBuildingNames(index = -1) {
    let result = [];
    const cursor = getCollection(Buildings);
    /* Iterate over the Cursor and get the document's 'name' values. */
    cursor.forEach((doc) => result.push(doc.name));
    if (index === -1) {
      return result;
    }
    return result[index];
  }

  /**
   * Returns the Events names.
   * @param index By default, index is -1. This indicates that we want to return ALL Location names. This default value can be invoked in the Front-End side, by simply doing getEventsNames() without any parameters supplied.
   * @returns {*} either ALL Event names or the Event name at index position.
   */
  static getEventNames(index = -1) {
    let result = [];
    const cursor = getCollection(Events);
    /* Iterate over the Cursor and get the document's 'name' values. */
    cursor.forEach((doc) => result.push(doc.name));
    if (index === -1) {
      return result;
    }
    return result[index];
  }

  /**
   * Deletes a Location, first looping through the TrashBag and Building collections to see if this location actively exists within any of these.  If so, the delete will not go through.
   * @param id The id of the location to be deleted.
   * @returns The set of locations after said id has been deleted.
   */
  static deleteLocation(id) {
    //initializes a local array of all the data within the TrashBag documents
    const TrashBag = [];
    const cursor = getCollection(TrashBags);
    cursor.forEach((doc) => TrashBags.push(doc.name));

    //initializes a local array of all the data within the building documents
    const Building = [];
    const cursorB = getCollection(Buildings);
    cursorB.forEach((doc) => Buildings.push(doc.name));

    //Loops through the TrashBag data and checks to see if the location exists
    for (i = 0; i < TrashBag.length; i++) {
      if (TrashBag[i].location_id === id) {
        //nothing
      } else {
        TrashBags.remove(this._id);
      }
    }

    //Loops through the Building data and checks to see if the location exists
    for (i = 0; i < Building.length; i++) {
      if (Building[i].location_id === id) {
        //nothing
      } else {
        Buildings.remove(this._id);
      }
    }
  }

  //export function addNewLocation(name, street, city, state, zip_code) {

  /**
   *
   * @param study_id
   * @param location
   * @param buildings
   * @param startDate
   * @param endDate
   * @param weight Boolean - if this is true then we get data by weight. Otherwise, by volume.
   * @returns {*}
   */
  static getTransitionDataByWeight(study_id, location, buildings, startDate, endDate, weight, trashType) {
    const eventsByDate = getEventsByDate(startDate, endDate);
    const eventsByLocation = getEventsByLocation(eventsByDate);
    const eventsByBuilding = getEventsByBuilding(eventsByLocation, buildings);
    const data = getData();
    return data;
  }

  /**
   * Returns Events within the range of startDate and endDate, inclusive.
   * If the study is ongoing (i.e. 2017 - current), endDate is handled by just fetching all events from startDate.
   */

  static getEventsByDate(startDate, endDate) {
    if (endDate === undefined) {
      return Events.find();
    }
    return Events.find();
  }


  static getEventsByLocation(events) {
    console.log("getEventsByLocations Not yet implemented")
  }

  /**
   *  Returns Events by building.
   *  If buildings is undefined, it means that we will sum the value of ALL buildings
   */
  getEventsByBuilding(events, buildings) {
    return _.filter(events, (event) => event);
  }

  getData(events, trashType, weight) {
    return _.chain(events)
        .pluck(trashType)
        .reduce((memo, num) => memo + num)
        .value();
  }


  getEvents() {
  return this.props.event;
  console.log(this.getEvents());
  }
}
  /** Require an array of Stuff documents in the props. */
  Wrapper.propTypes = {
    event: PropTypes.array.isRequired,
    location: PropTypes.array.isRequired,
    building: PropTypes.array.isRequired,
    trashbag: PropTypes.array.isRequired,
    ready: PropTypes.bool.isRequired,
  };

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Events');
  const subscription2 = Meteor.subscribe('Locations');
  const subscription3 = Meteor.subscribe('Buildings');
  const subscription4 = Meteor.subscribe('TrashBags');
  return {
    event: Events.find({}).fetch(),
    location: Events.find({}).fetch(),
    building: Events.find({}).fetch(),
    trashbag: Events.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready() && subscription3.ready() && subscription4.ready(),
  };
})(Wrapper);

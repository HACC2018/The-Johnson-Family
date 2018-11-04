import * as _ from 'meteor/underscore';
import { Events } from '/imports/api/Events/Events';

/*
  We need to fetch data for three types of charts: Composition, Comparison, and Transition.
  We will assume that Composition charts are Bar charts, Comparison chart
*/

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
export function getTransitionDataByWeight(study_id, location, buildings, startDate, endDate, weight, trashType) {
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
function getEventsByDate(startDate, endDate) {
  if (endDate === undefined) {
    return Events.find();
  }
  return Events.find();
}

function getEventsByLocation(events) {
  console.log("getEventsByLocations Not yet implemented")
}

/**
 *  Returns Events by building.
 *  If buildings is undefined, it means that we will sum the value of ALL buildings
 */
function getEventsByBuilding(events, buildings) {
  return _.filter(events, (event) => event);
}

function getData(events, trashType, weight) {
  return _.chain(events)
      .pluck(trashType)
      .reduce((memo, num) => memo + num)
      .value();
}

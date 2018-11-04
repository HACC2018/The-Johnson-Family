import * as _ from 'meteor/underscore';
import { Events }  from '/imports/api/Events/Events';
/*
  We need to fetch data for three types of charts: Composition, Comparison, and Transition.
  We will assume that Composition charts are Bar charts, Comparison chart
*/

export function getTransitionData(study_id, location, building, startDate, endDate) {
  let events = {};


  const eventsByDate = getEventsByDate(startDate, endDate);
  const eventsByLocation = getEventsByLocation(eventsByDate);

  if (building === true) {
    events = getEventsByBuilding(eventsByDate);
  }
  return data;
}

/**
 * Returns Events within the range of startDate and endDate, inclusive.
 * If the study is ongoing (i.e. 2017 - current), endDate is handled by just fetching all events from startDate.
 */
function getEventsByDate(startDate, endDate) {
  if (endDate === undefined) {
    return _.find();
  }
  return Events.find();
}

function getEventsByLocation(events) {
  return
}

function getEventsByBuilding(events) {

}


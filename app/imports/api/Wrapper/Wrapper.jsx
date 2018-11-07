import { _ } from 'meteor/underscore';
import { Locations } from '/imports/api/Locations/Locations';
import { Buildings } from '/imports/api/Buildings/Buildings';
import { Events } from '/imports/api/Events/Events';

/*
  We need to fetch data for three types of charts: Composition, Comparison, and Transition.
  We will assume that Composition charts are Bar charts, Comparison chart
*/

/**
 * Returns a Cursor pointer to the specified collection.
 * @param collection the collection to retrieve a Cursor pointer from.
 * @returns {*} a Cursor pointer to the specified collection.
 */
function getCollection(collection) {
  return collection.find({});
}


/**
 * Returns the Location names.
 * @param index By default, index is -1. This indicates that we want to return ALL Location names. This default value can be invoked in the Front-End side, by simply doing getLocationNames() without any parameters supplied.
 * @returns {*} either ALL Location names or the Location name at index position.
 */
export function getLocationNames(index = -1) {
  let result = [];
  const cursor = getCollection(Locations);
  /* Iterate over the Cursor and get the document's 'name' values. */
  cursor.forEach((doc) => result.push(doc.name));
  if (result.length === 0) { return "Locations Collection is empty" }
  if (index === -1) {
    return result;
  }
  return result[index];
}

export function getLocationStreets(index = -1) {
  let result = [];
  const cursor = getCollection(Locations);
  /* Iterate over the Cursor and get the document's 'name' values. */
  cursor.forEach((doc) => result.push(doc.street));
  if (result.length === 0) { return "Locations Collection is empty" }
  if (index === -1) {
    return result;
  }
  return result[index];
}

export function getLocationCities(index = -1) {
  let result = [];
  const cursor = getCollection(Locations);
  /* Iterate over the Cursor and get the document's 'name' values. */
  cursor.forEach((doc) => result.push(doc.city));
  if (result.length === 0) { return "Locations Collection is empty" }
  if (index === -1) {
    return result;
  }
  return result[index];
}

export function getLocationStates(index = -1) {
  let result = [];
  const cursor = getCollection(Locations);
  /* Iterate over the Cursor and get the document's 'name' values. */
  cursor.forEach((doc) => result.push(doc.state));
  if (result.length === 0) { return "Locations Collection is empty" }
  if (index === -1) {
    return result;
  }
  return result[index];
}

export function getLocationZipCode(index = -1) {
  let result = [];
  const cursor = getCollection(Locations);
  /* Iterate over the Cursor and get the document's 'name' values. */
  cursor.forEach((doc) => result.push(doc.zip_code));
  if (result.length === 0) { return "Locations Collection is empty" }
  if (index === -1) {
    return result;
  }
  return result[index];
}

export function addNewLocation(name, street, city, state, zip_code) {
  const cursor = getCollection(Locations);
  let uniqueStreets = [];
  cursor.forEach((doc) => uniqueStreets.push(doc.street));
  uniqueStreets = _.uniq(uniqueStreets);

  let uniqueCities = [];
  cursor.forEach((doc) => uniqueCities.push(doc.city));
  uniqueCities = _.uniq(uniqueCities);

  let uniqueStates = [];
  cursor.forEach((doc) => uniqueStates.push(doc.state));
  uniqueStates = _.uniq(uniqueStates);

  let uniqueZipCodes = [];
  cursor.forEach((doc) => uniqueZipCodes.push(doc.state));
  uniqueZipCodes = _.uniq(uniqueZipCodes);
  if (uniqueStreets.includes(street)) {
    return false;
  } else if (uniqueCities.includes(city)) {
    return false;
  } else if (uniqueStates.includes(state)) {
    return false;
  }  else if (uniqueZipCodes.includes(zip_code)) {
    return false;
  } else {
    Locations.insert({ name: name, street: street, city: city, state: state, zip_code: zip_code });
    return true;
  }
}

/**
 * Returns the Building names.
 * @param index By default, index is -1. This indicates that we want to return ALL Location names. This default value can be invoked in the Front-End side, by simply doing getBuildingNames() without any parameters supplied.
 * @returns {*} either ALL Building names or the Building name at index position.
 */
export function getBuildingNames(index = -1) {
  let result = [];
  const cursor = getCollection(Buildings);
  /* Iterate over the Cursor and get the document's 'name' values. */
  cursor.forEach((doc) => result.push(doc.name));
  if (index === -1) {
    return result;
  }
  return result[index];
}

export function addNewBuilding(name, location_id, fields) {
  const cursor = getCollection(Locations);
  let uniqueNames = [];
  cursor.forEach((doc) => uniqueNames.push(doc.name));
  uniqueNames = _.uniq(uniqueNames);

  if (uniqueNames.includes(name)) {
    return false;
  } else {
    Buildings.insert({ name: name, location_id: location_id });
    return true;
  }
}

/**
 * Returns the Events names.
 * @param index By default, index is -1. This indicates that we want to return ALL Location names. This default value can be invoked in the Front-End side, by simply doing getEventsNames() without any parameters supplied.
 * @returns {*} either ALL Event names or the Event name at index position.
 */
export function getEventNames(index = -1) {
  let result = [];
  const cursor = getCollection(Events);
  /* Iterate over the Cursor and get the document's 'name' values. */
  cursor.forEach((doc) => result.push(doc.name));
  if (index === -1) {
    return result;
  }
  return result[index];
}

export function addNewEvent(name, date) {
  const cursor = getCollection(Locations);
  let uniqueNames = [];
  cursor.forEach((doc) => uniqueNames.push(doc.name));
  uniqueNames = _.uniq(uniqueNames);

  if (uniqueNames.includes(name)) {
    return false;
  } else {
    Events.insert({ name: name, date: date });
    return true;
  }
}

// export function getCollectionValues(collection) {
//   const cursor = getCollection(collection);
//   let collectionObject = {};
//   for (document in cursor) {
//     collectionObject.name = document.name;
//     collectionObject.street = document.street;
//     collectionObject.city = document.city;
//     collectionObject.state = document.state;
//     collectionObject.zip_code = document.zip_code;
//   }
//   return collectionObject;
// }

// /**
//  *
//  * @param study_id
//  * @param location
//  * @param buildings
//  * @param startDate
//  * @param endDate
//  * @param weight Boolean - if this is true then we get data by weight. Otherwise, by volume.
//  * @returns {*}
//  */
// export function getTransitionDataByWeight(study_id, location, buildings, startDate, endDate, weight, trashType) {
//   const eventsByDate = getEventsByDate(startDate, endDate);
//   const eventsByLocation = getEventsByLocation(eventsByDate);
//   const eventsByBuilding = getEventsByBuilding(eventsByLocation, buildings);
//   const data = getData();
//   return data;
// }
//
// /**
//  * Returns Events within the range of startDate and endDate, inclusive.
//  * If the study is ongoing (i.e. 2017 - current), endDate is handled by just fetching all events from startDate.
//  */
// function getEventsByDate(startDate, endDate) {
//   if (endDate === undefined) {
//     return Events.find();
//   }
//   return Events.find();
// }
//
// function getEventsByLocation(events) {
//   console.log("getEventsByLocations Not yet implemented")
// }
//
// /**
//  *  Returns Events by building.
//  *  If buildings is undefined, it means that we will sum the value of ALL buildings
//  */
// function getEventsByBuilding(events, buildings) {
//   return _.filter(events, (event) => event);
// }
//
// function getData(events, trashType, weight) {
//   return _.chain(events)
//       .pluck(trashType)
//       .reduce((memo, num) => memo + num)
//       .value();
// }
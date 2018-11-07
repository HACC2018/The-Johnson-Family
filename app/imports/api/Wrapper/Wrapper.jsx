import { _ } from 'meteor/underscore';
import { Locations } from '/imports/api/Locations/Locations';
import { Buildings } from '/imports/api/Buildings/Buildings';
import { Events } from '/imports/api/Events/Events';
import { TrashBags} from '/imports/api/TrashBags/TrashBags';

/*
  We need to fetch data for three types of charts: Composition, Comparison, and Transition.
  We will assume that Composition charts are Bar charts, Comparison chart
*/

function getCollection(collectionKey) {
  switch(collectionKey) {
    case 1:
      return Locations.find();
    case 2:
     return Buildings.find();
    case 3:
      return Events.find();
    case 4:
      return TrashBags.find();
    default:
      throw new SyntaxError();
  }
}

/**
 * Returns the values of the specified collection.
 * @param collectionKey the key indicating which collection to retrieve data from. See #information channel on Discord.
 * @param field if specified, it will return all the values for that field ONLY. If left blank, it will return the entire Collection with all the values.
 * @param index if specified, it will only return the document at that index position. If left blank, it will return all documents fro the collection.
 */
export function getCollectionValues(collectionKey, field = undefined, index = -1 ) {
  const cursor = getCollection(collectionKey);
  let result = [];
  if (field !== undefined) {
    cursor.forEach((doc) => result.push(doc[field]));
  } else {
    cursor.forEach((doc) => result.push(doc));
  }
  if (index === -1) {
    return result;
  }
  return result[index];
}

/**
 * Returns true if the document was added to the Location collection successfully. False, otherwise.
 * This function guarantees that the Admin cannot add duplicate Locations. TODO: This function needs to be optimized so that we do case-insensitive string comparison, and no white space string comparison.
 * @param name field value
 * @param street field value
 * @param city field value
 * @param state field value
 * @param zip_code field value
 */
export function addNewLocation(name, street, city, state, zip_code) {
  const cursor = getCollection(1);
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
 * Returns true if the document was added to the Buildings collection successfully. False, otherwise.
 * This function guarantees that the Admin cannot add duplicate Buildings. TODO: This function needs to be optimized so that we do case-insensitive string comparison, and no white space string comparison.
 * @param name field value
 * @param location_id field value, referencing the selected location id.
 */
export function addNewBuilding(name, location_id) {
  const cursor = getCollection(1);
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
 * Returns true if the document was added to the Events collection successfully. False, otherwise.
 * This function guarantees that the Admin cannot add duplicate Events. TODO: This function needs to be optimized so that we do case-insensitive string comparison, and no white space string comparison.
 * @param name field value
 * @param date field value
 */
export function addNewEvent(name, date) {
  const cursor = getCollection(1);
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

/**
 * Deletes a Location, first looping through the TrashBag and Building collections to see if this location actively exists within any of these.  If so, the delete will not go through.
 * @param id The id of the location to be deleted.
 * @returns boolean set of locations after said id has been deleted.
 */
export function deleteBuilding(id) {
  const building_ids = []; //Stores all building ids associated with a trash bag
  const trashbag_cursor = getCollection(4);
  trashbag_cursor.forEach((doc) => building_ids.push(doc.building_id));

  if (building_ids.includes(id)) {
    return false; //There is a trash bag that is associated with the building we're trying to delete.
  } else {}
  Buildings.remove({ id: id });
  return true;
}


function getCompositionData() {

}


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

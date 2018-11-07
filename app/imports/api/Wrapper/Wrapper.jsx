import { _ } from 'meteor/underscore';
import { Locations } from '/imports/api/Locations/Locations';
import { Buildings } from '/imports/api/Buildings/Buildings';
import { Events } from '/imports/api/Events/Events';
import { TrashBags } from '/imports/api/TrashBags/TrashBags';
import { Categories } from '../Categories/Categories';
import { Forms } from '../Forms/Forms';
import { Studies } from '../Studies/Studies';

/*
  We need to fetch data for three types of charts: Composition, Comparison, and Transition.
  We will assume that Composition charts are Bar charts, Comparison chart
*/

function getCollection(collectionKey) {
  switch (collectionKey) {
    case 1:
      return Locations.find();
    case 2:
      return Buildings.find();
    case 3:
      return Events.find();
    case 4:
      return TrashBags.find();
    case 5:
      return Categories.find();
    case 6:
      return Forms.find();
    case 7:
      return Studies.find();
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
export function getCollectionValues(collectionKey, field = undefined, index = -1) {
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
  cursor.forEach((doc) => uniqueZipCodes.push(doc.zip_code));
  uniqueZipCodes = _.uniq(uniqueZipCodes);
  if (uniqueStreets.includes(street) && uniqueCities.includes(city) && uniqueStates.includes(state) && uniqueZipCodes.includes(zip_code)){
    return false;
  } else {
          Locations.insert({ name: name, street: street, city: city, state: state, zip_code: zip_code });
          return true;
        }
}

/**
 * Returns true if the document was added to the Categories collection successfully. False, otherwise.
 * This function guarantees that the Admin cannot add duplicate Categories. TODO: This function needs to be optimized so that we do case-insensitive string comparison, and no white space string comparison.
 * @param name field value
 * @param parent_id field value, referencing the selected category id.
 * @param level field value
 */
export function addNewCategory(name, parent_id, level) {
  const cursor = getCollection(5);
  let uniqueNames = [];
  cursor.forEach((doc) => uniqueNames.push(doc.name));
  uniqueNames = _.uniq(uniqueNames);

  let uniqueParent_id = [];
  cursor.forEach((doc) => uniqueParent_id.push(doc.parent_id));
  uniqueParent_id = _.uniq(uniqueParent_id);

  let uniqueLevel = [];
  cursor.forEach((doc) => uniqueLevel.push(doc.level));
  uniqueLevel = _.uniq(uniqueLevel);

  if (uniqueNames.includes(name) && uniqueParent_id.includes(parent_id) && uniqueLevel.includes(level)) {
    return false;
      }
      else {
        Categories.insert({ name: name, parent_id: parent_id, level: level })
        return true;

      }
}

/**
 * Returns true if the document was added to the Forms collection successfully. False, otherwise.
 * This function guarantees that the Admin cannot add duplicate Forms. TODO: This function needs to be optimized so that we do case-insensitive string comparison, and no white space string comparison.
 * @param date field value
 * @param form_id field value, referencing the selected form id.
 */
export function addNewForm(date, form_id) {
  const cursor = getCollection(6);
  let uniqueDates = [];
  cursor.forEach((doc) => uniqueDates.push(doc.name));
  uniqueDates = _.uniq(uniqueDates);

  let uniqueForm_id = [];
  cursor.forEach((doc) => uniqueForm_id.push(doc.form_id));
  uniqueForm_id = _.uniq(uniqueForm_id);

  if (uniqueDates.includes(name) && uniqueForm_id.includes(form_id)) {
    return false;
  }
    else {
      Forms.insert({ date: date, form_id: form_id })
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
  const cursor = getCollection(2);
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
  const cursor = getCollection(3);
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
 * Always adds a new study, as there can be identical studies.
 * @param name field value
 * @param form_id field value, referencing the selected form id.
 */
export function addNewStudy(name, category_id, start_date, end_date) {

  Categories.insert({ name: name, category_id: category_id, start_date: start_date, end_date: end_date })

}

/**
 * Returns true if the document was added to the TrashBag collection successfully. False, otherwise.
 * This function guarantees that the Admin cannot add duplicate TrashBag. TODO: This function needs to be optimized so that we do case-insensitive string comparison, and no white space string comparison.
 * @param event field value
 * @param study_id field value, referencing the selected study id.
 * @param event_id field value, referencing the selected event id.
 * @param building_id field value, referencing the selected building id.
 * @param category_id field value, referencing the selected category id.
 * @param form_id field value, referencing the selected form id.
 * @param accepted boolean value, whether or not it was accepted by the admin
 * @param weight field value
 * @param volume field value
 * @param count field value
 */
export function addNewTrashBag(study_id, event_id, building_id, category_id, form_id, accepted, weight, volume, count) {
  const cursor = getCollection(4);

  let uniqueStudy_id = [];
  cursor.forEach((doc) => uniqueStudy_id.push(doc.name));
  uniqueStudy_id = _.uniq(uniqueStudy_id);

  let uniqueEvent_id = [];
  cursor.forEach((doc) => uniqueEvent_id.push(doc.name));
  uniqueEvent_id = _.uniq(uniqueEvent_id);

  let uniqueBuilding_id = [];
  cursor.forEach((doc) => uniqueBuilding_id.push(doc.name));
  uniqueBuilding_id = _.uniq(uniqueBuilding_id);

  let uniqueCategory_id = [];
  cursor.forEach((doc) => uniqueCategory_id.push(doc.name));
  uniqueCategory_id = _.uniq(uniqueCategory_id);

  let uniqueForm_id = [];
  cursor.forEach((doc) => uniqueForm_id.push(doc.name));
  uniqueForm_id = _.uniq(uniqueForm_id);

  let uniqueAccepted = [];
  cursor.forEach((doc) => uniqueAccepted.push(doc.name));
  uniqueAccepted = _.uniq(uniqueAccepted);

  let uniqueWeight = [];
  cursor.forEach((doc) => uniqueWeight.push(doc.name));
  uniqueWeight = _.uniq(uniqueWeight);

  let uniqueVolume = [];
  cursor.forEach((doc) => uniqueVolume.push(doc.name));
  uniqueVolume = _.uniq(uniqueVolume);

  let uniqueCount = [];
  cursor.forEach((doc) => uniqueCount.push(doc.name));
  uniqueCount = _.uniq(uniqueCount);

    if (uniqueStudy_id.includes(study_id)) {
      return false;
    } else
      if (uniqueEvent_id.includes(event_id)) {
        return false;
      } else
        if (uniqueBuilding_id.includes(building_id)) {
          return false;
        } else
          if (uniqueCategory_id.includes(category_id)) {
            return false;
          } else
            if (uniqueForm_id.includes(form_id)) {
              return false;
            } else
              if (uniqueAccepted.includes(accepted)) {
                return false;
              } else
                if (uniqueWeight.includes(weight)) {
                  return false;
                } else
                  if (uniqueVolume.includes(volume)) {
                    return false;
                  } else
                    if (uniqueCount.includes(count)) {
                      return false;
                    } else {
                      Categories.insert({
                        event: event,
                        study_id: study_id,
                        event_id: event_id,
                        building_id: building_id,
                        category_id: category_id,
                        form_id: form_id,
                        accepted: accepted,
                        weight: weight,
                        volume: volume,
                        count: count
                      })
                      return true;

                    }
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

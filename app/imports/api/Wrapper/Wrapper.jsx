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
 * Returns an array that holds within it the amount of campuses that match the three tested names.
 * @return {Array} An array of how many campuses of each exist.
 */
export function getCompositionOfLocations() {
  const cursor = getCollection(1);
  let result = [];
  let final = [];
  cursor.forEach((doc) => result.push(doc.name));

  const KCC = _.filter(result, function (entry) {
    return entry.toLowerCase().includes('kcc')
  });

  const KCCAmount = KCC.length;
  final.push(KCCAmount);

  const UH = _.filter(result, function (entry) {
    return entry.toLowerCase().includes('uh')
  });
  const UHAmount = UH.length;
  final.push(UHAmount);

  const WestOahu = _.filter(result, function (entry) {
    return entry.toLowerCase().includes('westoahu')
  });
  const westOahuAmount = WestOahu.length;
  final.push(westOahuAmount);

  return final;
}

/**
 * Returns an array similar to getCompositionOfLocations, except it filters through all the trash bags and returns the amount of each per category type.
 * @return {Array} An array containing a list of numbers referencing the amount of trash bags listed under certain trash types.
 */
export function getCategoryValues() {
  const cursor = getCollection(5);
  let all = [];
  let final = [];
  cursor.forEach((doc) => all.push(doc.parent_id));

  const paper = _.filter(all, function (entry) {
    return entry.toLowerCase().includes('paper')
  });
  const paperAmount = paper.length;
  final.push(paperAmount);

  const plastic = _.filter(all, function (entry) {
    return entry.toLowerCase().includes('plastic')
  });
  const plasticAmount = plastic.length;
  final.push(plasticAmount);

  const glass = _.filter(all, function (entry) {
    return entry.toLowerCase().includes('glass')
  });
  const glassAmount = glass.length;
  final.push(glassAmount);

  const metal = _.filter(all, function (entry) {
    return entry.toLowerCase().includes('metal')
  });
  const metalAmount = metal.length;
  final.push(metalAmount);

  const organics = _.filter(all, function (entry) {
    return entry.toLowerCase().includes('organics')
  });
  const organicsAmount = organics.length;
  final.push(organicsAmount);

  return final;
}

/**
 * Returns an array of blah blah blah
 */
export function getTrashBagsByDate() {
  let final = [];
  const trash = getCollection(4);
  let allTrash = [];
  trash.forEach((doc) => allTrash.push(doc.event_id));

  const event = getCollection(3);
  let allEvents = [];
  event.forEach((doc) => allEvents.push(doc.date));

  let springEvents = _.filter(allEvents, function (spring) {
    return (spring.toString().includes('January')) || (spring.toString().includes('February')) || (spring.toString().includes('March')) || (spring.toString().includes('April')) || (spring.toString().includes('May'))
  });

  let spring17 = _.filter(springEvents, function (spring) {
    return spring.toString().includes('2017')
  });
  let spring18 = _.filter(springEvents, function (spring) {
    return spring.toString().includes('2018')
  });

  let fallEvents = _.filter(allEvents, function (fall) {
    return (fall.toString().includes('August')) || (fall.toString().includes('September')) || (fall.toString().includes('October')) || (fall.toString().includes('November')) || (fall.toString().includes('December'))
  });

  let fall17 = _.filter(fallEvents, function (fall) {
    return fall.toString().includes('2017')
  });
  let fall18 = _.filter(fallEvents, function (fall) {
    return fall.toString().includes('2018')
  });

  final.push(spring17.length);
  final.push(fall17.length);
  final.push(spring18.length);
  final.push(fall18.length);

  return final;

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
  if (uniqueStreets.includes(street) && uniqueCities.includes(city) && uniqueStates.includes(state) && uniqueZipCodes.includes(zip_code)) {
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

    Categories.insert({ name: name, parent_id: parent_id, level: level });
    return true;

  }
}

/**
 * Returns true if the document was added to the Forms collection successfully. False, otherwise.
 * This function guarantees that the Admin cannot add duplicate Forms. TODO: This function needs to be optimized so that we do case-insensitive string comparison, and no white space string comparison.
 * @param date field value
 */

export function addNewForm(date) {
    Forms.insert({ date: date });
    return true;
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
 * @param category_id field value, referencing the selected form id.
 * @param start_date field value, referencing the start date
 * @param end_date field value, referencing the end date
 *
 */
export function addNewStudy(name, category_id, start_date, end_date) {

  Studies.insert({ name: name, category_id: category_id, start_date: start_date, end_date: end_date });

}

/**
 * Returns true if the document was added to the TrashBag collection successfully. False, otherwise.
 * This function guarantees that the Admin cannot add duplicate TrashBag. TODO: This function needs to be optimized so that we do case-insensitive string comparison, and no white space string comparison.
 * @param event_id field value, referencing the selected event id.
 * @param building_id field value, referencing the selected building id.
 * @param location_id field value, referencing the selected location id.
 * @param category_id field value, referencing the selected category id.
 * @param form_id field value, referencing the selected form id.
 * @param accepted boolean value, always set to false.
 * @param weight field value.
 * @param volume field value.
 * @param count field value.
 */
export function addNewTrashBag(event_id, building_id, location_id, category_id, form_id, accepted = false, weight, volume, count) {
  const cursor = getCollection(4);

  const date = new Date();
  const stripped_date = date.toLocaleString('en-US');

//Create a new form
  addNewForm(stripped_date);
  const forms_cursor = getCollection(6);
  let formId = undefined;
  //Find the Form ID of the Form document we just created
  forms_cursor.forEach((doc) =>  {
    if (doc.date === stripped_date) {
      formId = doc._id;
    }
  });
  let uniqueEvent_id = [];
  cursor.forEach((doc) => uniqueEvent_id.push(doc.event_id));
  uniqueEvent_id = _.uniq(uniqueEvent_id);

  let uniqueBuilding_id = [];
  cursor.forEach((doc) => uniqueBuilding_id.push(doc.building_id));
  uniqueBuilding_id = _.uniq(uniqueBuilding_id);

  let uniqueLocation_id = [];
  cursor.forEach((doc) => uniqueLocation_id.push(doc.location_id));
  uniqueLocation_id = _.uniq(uniqueLocation_id);

  let uniqueCategory_id = [];
  cursor.forEach((doc) => uniqueCategory_id.push(doc.category_id));
  uniqueCategory_id = _.uniq(uniqueCategory_id);


  let uniqueWeight = [];
  cursor.forEach((doc) => uniqueWeight.push(doc.weight));
  uniqueWeight = _.uniq(uniqueWeight);

  let uniqueVolume = [];
  cursor.forEach((doc) => uniqueVolume.push(doc.volume));
  uniqueVolume = _.uniq(uniqueVolume);

  let uniqueCount = [];
  cursor.forEach((doc) => uniqueCount.push(doc.count));
  uniqueCount = _.uniq(uniqueCount);


  if (uniqueEvent_id.includes(event_id) && uniqueLocation_id.includes(location_id) && uniqueBuilding_id.includes(building_id) && uniqueCategory_id.includes(category_id) && uniqueWeight.includes(weight) && uniqueVolume.includes(volume) && uniqueCount.includes(count)) {
    return false;
  }
  else {
    TrashBags.insert({
      event: event,

      event_id: event_id,
      building_id: building_id,
      location_id: location_id,
      category_id: category_id,
      form_id: formId,
      accepted: accepted,
      weight: weight,
      volume: volume,
      count: count
    });
    return true;
  }

}


export function getBuildingNamesByLocation(location_key) {
  const location_ids_of_buildings = getCollectionValues(2, "location_id");
  const linked_building_ids = _.filter(location_ids_of_buildings, (id) => {
    return id === location_key;
  });

  let buildings_cursor = getCollection(2);
  let result = [];
  buildings_cursor.forEach((doc) => {
    if (linked_building_ids.includes(doc.location_id)) {
      result.push(doc.name);
    }
  });
  return result;

}

export function getBuildingIdsByLocation(location_key) {
  const location_ids_of_buildings = getCollectionValues(2, "location_id");
  const linked_building_ids = _.filter(location_ids_of_buildings, (id) => {
    return id === location_key;
  });

  let buildings_cursor = getCollection(2);
  let result = [];
  buildings_cursor.forEach((doc) => {
    if (linked_building_ids.includes(doc.location_id)) {
      result.push(doc._id);
    }
  });
  return result;
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

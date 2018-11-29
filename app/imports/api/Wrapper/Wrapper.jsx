// import { Mongo } from 'meteor/mongo';
import { _ } from 'meteor/underscore';
import { Locations } from '/imports/api/Locations/Locations';
import { Buildings } from '/imports/api/Buildings/Buildings';
import { Events } from '/imports/api/Events/Events';
import { TrashBags } from '/imports/api/TrashBags/TrashBags';
import SimpleSchema from 'simpl-schema';
import { Categories } from '../Categories/Categories';
import { Forms } from '../Forms/Forms';
import { Studies } from '../Studies/Studies';

/*
  We need to fetch data for three types of charts: Composition, Comparison, and Transition.
  We will assume that Composition charts are Bar charts, Comparison chart
*/
export const constants = {
  codes: {
    locations: 1,
    buildings: 2,
    events: 3,
    trashBags: 4,
    categories: 5,
    forms: 6,
    studies: 7,
  },
};

export function getCollection(collectionKey, isExcludeUnverified = true) {
  switch (collectionKey) {
    case 1:
      return Locations.find().fetch();
    case 2:
      return Buildings.find().fetch();
    case 3:
      return Events.find().fetch();
    case 4:
      return isExcludeUnverified ? TrashBags.find().fetch({ accepted: true }) : TrashBags.find().fetch();
    case 5:
      return Categories.find().fetch();
    case 6:
      return Forms.find().fetch();
    case 7:
      return Studies.find().fetch();
    default:
      throw new SyntaxError();
  }
}

export function addNewTrashBag(
    event_id, building_id, location_id, category_id, form_id, accepted = false, weight, volume, count, notes = 'none',
) {
  return TrashBags.insert({
    event_id: event_id,
    building_id: building_id,
    location_id: location_id,
    category_id: category_id,
    form_id: form_id,
    accepted: accepted,
    weight: weight,
    volume: volume,
    count: count,
    notes: notes,
  });
}

export function addNewLocation(name, street, city, state, zip_code) {
  return Locations.insert({ name: name, street: street, city: city, state: state, zip_code: zip_code });
}

export function addNewCategory(name, parent_id) {
  const level = !(parent_id) ? 1 : Categories.find(category => category._id === parent_id).level + 1
  return Categories.insert({ name: name, parent_id: parent_id, level: level });
}


export function addNewForm(date) {
  return Forms.insert({ date: date });
}

export function addNewBuilding(name, location_id) {
  return Buildings.insert({ name: name, location_id: location_id });
}

export function addNewEvent(name, date) {
  return Events.insert({ name: name, date: date });
}

export function addNewStudy(name, category_ids, start_date, end_date = -1) {
  if (end_date === -1) {
    return Studies.insert({ name: name, category_ids: category_ids, start_date: start_date });
  }
  return Studies.insert({ name: name, category_ids: category_ids, start_date: start_date, end_date: end_date });
}

// Edit functions

export function editStudy(id, name, category_ids, start_date, end_date = -1) {
  if (end_date === -1) {
    return Studies.update({ _id: id }, {
      $set: {
        name: name,
        category_ids: category_ids, // should be array
        start_date: start_date,
      },
    });
  }
  return Studies.update({ _id: id }, {
    $set: {
      name: name,
      category_ids: category_ids, // should be array
      start_date: start_date,
      end_date: end_date,
    },
  });
}

export function editLocation(id, name, street, city, state, zip_code) {
  Locations.update({ _id: id }, {
    $set: {
      name: name,
      street: street,
      city: city,
      state: state,
      zip_code: zip_code,
    },
  });
  return true;
}

export function editBuilding(id, name, location_id) {
  Buildings.update({ _id: id }, {
    name: name,
    location_id: location_id,
  });
  return true;
}

export function editTrashBag(
    id, event_id, building_id, location_id, category_id, form_id, accepted, weight, volume, count, notes,
) {
  TrashBags.update({ _id: id }, {
    event_id: String,
    building_id: String,
    category_id: String,
    location_id: String,
    form_id: String,
    accepted: Boolean,
    weight: Number,
    volume: Number,
    count: SimpleSchema.Integer,
    notes: notes,
  });
  return true;
}

// export function getBuildingNamesByLocation(location_key) {
//   const location_ids_of_buildings = getCollectionValues(2, "location_id");
//   const linked_building_ids = _.filter(location_ids_of_buildings, (id) => {
//     return id === location_key;
//   });
//
//   let buildings_cursor = getCollection(2);
//   let result = [];
//   buildings_cursor.forEach((doc) => {
//     if (linked_building_ids.includes(doc.location_id)) {
//       result.push(doc.name);
//     }
//   });
//   return result;
//
// }

// export function getBuildingIdsByLocation(location_key) {
//   const location_ids_of_buildings = getCollectionValues(2, "location_id");
//   const linked_building_ids = _.filter(location_ids_of_buildings, (id) => {
//     return id === location_key;
//   });
//
//   let buildings_cursor = getCollection(2);
//   let result = [];
//   buildings_cursor.forEach((doc) => {
//     if (linked_building_ids.includes(doc.location_id)) {
//       result.push(doc._id);
//     }
//   });
//   return result;
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

// New functions for refactor

export function getBagLinkedCollections() {
  const data = {};
  data.bags = getCollection(constants.codes.trashBags);
  data.events = getCollection(constants.codes.events);
  data.locations = getCollection(constants.codes.locations);
  data.buildings = getCollection(constants.codes.buildings);
  data.categories = getCollection(constants.codes.categories);
  data.forms = getCollection(constants.codes.forms);
  return data;
}

export function getBagLinkedData(bag_id, collections) {
  const datum = {};
  const bag = _.find(collections.bags, aBag => aBag._id === bag_id);
  datum.bag = bag;
  datum.event = _.find(collections.events, event => bag.event_id === event._id);
  datum.location = _.find(collections.locations, location => bag.location_id === location._id);
  datum.building = _.find(collections.buildings, building => bag.building_id === building._id);
  datum.category = _.find(collections.categories, category => bag.category_id === category._id);
  datum.form = _.find(collections.forms, form => bag.category_id === form._id);
  return datum;
}

export function getEventsByDate(date, rangeDate = -1) {
  const events = getCollection(constants.codes.events);
  if (rangeDate === -1) {
    return events.filter(event => event.date === date);
  }
  return events.filter(event => event.date > date && event.date < rangeDate);

}

export function getTrashBagsByDate(date, rangeDate = -1) {
  const event_ids = _.pluck(getEventsByDate(date, rangeDate), '_id');
  const bags = getCollection(constants.codes.trashBags);
  return bags.filter(bag => bag.event_id in event_ids);
}

// No export: helper function
function getClosestParentId(id, reqCategoryIds, categories) {
  const p_id = categories.id.parent_id;

  if (p_id === 0) {
    return categories.other._id;
  }
  if (p_id in reqCategoryIds) {
    return p_id;
  }
  return getClosestParentId(p_id, reqCategoryIds, categories);

}

// This function is to help format data for graph modules
// export function splitData(inputData, field, isIncludeDate = false) {
//   const data = inputData;
//   const splitDataObj = {};
//   splitDataObj.labels = [];
//   splitDataObj.data = [];
//   if (isIncludeDate) { splitDataObj['']; }
//   for (const datum of data) {
//     splitDataObj.labels.push(datum.label);
//     splitDataObj.data.push(datum[field]);
//   }
//   return splitDataObj;
// }

// Returns earliest event date in the database
export function getEarliestDate() {
  return _.min(_.pluck(getCollection(constants.codes.events), 'date'));
}

// Returns latest event date in the database
export function getLatestDate() {
  return _.min(_.pluck(getCollection(constants.codes.events), 'date'));
}

// Bags: sum all categories, display required categories (i.e. getClosestParent),
export function buildCompositionData(bagArray, reqCategoryIds, fields, isIncludeDate = false) {
  const categories = getCollection(constants.codes.categories);
  const events = isIncludeDate ? getCollection(constants.codes.events) : -1;

  const data = {};

  // for (const id of reqCategoryIds) {
  //   data[id] = {};
  //
  //   for (const field of fields) {
  //     data[id][field] = 0;
  //   }
  // }
  // for (const id of reqCategoryIds) {
  reqCategoryIds.forEach(function (id) {
        data[id] = {};

        fields.forEach(function (field) {
          data[id][field] = 0;
        });
      });

  // for (const bag of bagArray) {
  //   let id = bag.category_id;
  //   if (!(id in data)) id = getClosestParentId(id, reqCategoryIds, categories);
  //
  //   data[id].label = categories.find(category => category._id === id).name;
  //   if (isIncludeDate) data[id].date = events.find(event => event._id === bag.event_id).date;
  //
  //   for (const field of fields) {
  //     data[id][field] += bag[field];
  //   }
  // }
  bagArray.forEach(function (bag) {
    let id = bag.category_id;
    if (!(id in data)) id = getClosestParentId(id, reqCategoryIds, categories);

    data[id].label = categories.find(category => category._id === id).name;
    if (isIncludeDate) data[id].date = events.find(event => event._id === bag.event_id).date;

    fields.forEach(function (field) {
      data[id][field] += bag[field];
    });
  });

  console.log(data);

  if (isIncludeDate) {
    Object.keys(data).forEach(function (key) {
      const datum = data[key];
      if (!('date' in datum)) delete data[key];
    });
  }

  return data;
}

// Takes an object from buildCompositionData() and formats it for display in a line graph component
export function formatTransitionData(data, fieldName) {
  return _.map(data,
      function (datum) {
        const obj = {};
        obj.x = datum.date;
        obj.y = datum[fieldName];
        return obj;
      });
}

export function randNum() {
  return Math.floor((Math.random() * 100) + 1);
}

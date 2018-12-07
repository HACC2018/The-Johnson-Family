import { _ } from 'meteor/underscore';
import { Locations } from '/imports/api/Locations/Locations';
import { Buildings } from '/imports/api/Buildings/Buildings';
import { Events } from '/imports/api/Events/Events';
import { TrashBags } from '/imports/api/TrashBags/TrashBags';
import { Categories } from '../Categories/Categories';
import { Forms } from '../Forms/Forms';
import { Studies } from '../Studies/Studies';


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

/**
 * Returns an array of document objects contained in the specified database collection.
 * For the collectionKey, use constants.codes autocomplete to choose a collection.
 *
 * Note the TrashBags collection returns only verified bags by default. In order to include
 * bags that have not yet been verified in the array, override isExcludeUnverified to false.
 *
 * @param collectionKey
 * @param isExcludeUnverified
 * @returns {*}
 */
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

export function addNewLocation(name, street, city, state, zip_code) {
  return Locations.insert({ name: name, street: street, city: city, state: state, zip_code: zip_code });
}

export function addNewCategory(name, parent_id) {
  const categories = getCollection(constants.codes.categories);

  const level = !(parent_id) || parent_id === '0' ?
      1
      : categories.find(category => category._id === parent_id).level + 1;

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

/**
 * Adds a new TrashBag to the database. Note that the 'accepted' field is false by default.
 *
 * @param event_id
 * @param building_id
 * @param location_id
 * @param category_id
 * @param form_id
 * @param weight
 * @param volume
 * @param count
 * @param notes
 * @param accepted
 * @returns {*}
 */
export function addNewTrashBag(
    event_id, building_id, location_id, category_id, form_id, weight, volume, count,
    notes = 'none', accepted = false,
) {
  if (category_id === 0) {
    throw 'addNewTrashBag: not a valid id';
  }
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
    id, event_id, building_id, location_id, category_id, form_id, weight, volume, count, notes, accepted,
) {
  TrashBags.update({ _id: id }, { $set: {
    event_id: event_id,
    building_id: building_id,
    category_id: category_id,
    location_id: location_id,
    form_id: form_id,
    accepted: accepted,
    weight: weight,
    volume: volume,
    count: count,
    notes: notes,
  } });
  return true;
}

// New functions for refactor

/**
 * Returns an object containing all the collections linked to TrashBags. The ideal scenario is that
 * the bagsArray object passed into this function is filtered from the full TrashBags collection.
 */
export function getBagLinkedCollections(bagsArray) {
  const data = {};
  data.bags = bagsArray;
  data.events = getCollection(constants.codes.events);
  data.locations = getCollection(constants.codes.locations);
  data.buildings = getCollection(constants.codes.buildings);
  data.categories = getCollection(constants.codes.categories);
  data.forms = getCollection(constants.codes.forms);
  return data;
}

/**
 * Takes collections from getBagLinkedCollections() and builds an object containing all data
 * linked to a specific bag from all collections.
 *
 * @param bag_id
 * @param collections
 */
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

/**
 * Returns an array of events filtered by a date or a range of dates. If rangeDate is overridden,
 * it will act as the later date in the range.
 * @param date
 * @param rangeDate
 * @param eventsCollection
 * @returns {*}
 */
export function getEventsByDate(date, rangeDate = -1, eventsCollection = getCollection(constants.codes.events)) {
  if (rangeDate === -1) {
    return eventsCollection.filter(event => event.date === date);
  }
  // console.log('getEventsByDate:');
  // console.log(eventsCollection.filter(event => (event.date >= date) && (event.date <= rangeDate)));
  return eventsCollection.filter(event => (event.date >= date) && (event.date <= rangeDate));

}

/**
 * Returns an array of TrashBags filtered by a date or a range of dates. If rangeDate is overridden,
 * it will act as the later date in the range.
 * @param date
 * @param rangeDate
 * @param bagsCollection
 * @returns {*}
 */
export function getTrashBagsByDate(date, rangeDate = -1, bagsCollection = getCollection(constants.codes.trashBags)) {
  const event_ids = _.pluck(getEventsByDate(date, rangeDate), '_id');
  // console.log('getTrashBagsByDate: event_ids (after pluck), date, rangedate, retVal');
  // console.log(event_ids);
  // console.log(date);
  // console.log(rangeDate);
  // console.log(bagsCollection.filter(bag => event_ids.includes(bag.event_id)));
  return bagsCollection.filter(bag => event_ids.includes(bag.event_id));
}

// No export: recursive helper function
function getClosestParentId(id, reqCategoryIds, categories) {
  const p_id = categories.find(c => c._id === id).parent_id;

  if (p_id === '0') {
    const rootCategories = _.filter(categories, c => c.parent_id === '0');
    const otherCategory = rootCategories.find(c => c.name === 'other')._id;
    return otherCategory;
  }
  if (p_id in reqCategoryIds) {
    return p_id;
  }
  return getClosestParentId(p_id, reqCategoryIds, categories);

}

/**
 * Returns earliest event date in the database by default.
 * Can be overridden to find earliest event in an array of events.
 *
 * @returns {Date}
 */
export function getEarliestDate(eventsArr = getCollection(constants.codes.events)) {
  const date = _.min(_.pluck(eventsArr, 'date'));
  return date === Number.NEGATIVE_INFINITY || date === Number.POSITIVE_INFINITY ? new Date() : date;
}

/**
 * Returns latest event date in the database by default.
 * Can be overridden to find earliest event in an array of events.
 *
 * @returns {Date}
 */
export function getLatestDate(eventsArr = getCollection(constants.codes.events)) {
  const date = _.max(_.pluck(eventsArr, 'date'));
  return date === Number.NEGATIVE_INFINITY || date === Number.POSITIVE_INFINITY ? new Date() : date;
}

/**
 * Returns an array of TrashBags summed up by categories listed in reqCategoryIds.
 *
 * fields is an array containing the names (as strings) of the fields you want to
 * include in the object (i.e. 'weight', 'volume', and/or 'count'.
 *
 * @param bagArray
 * @param reqCategoryIds
 * @param fields
 */
export function buildCompositionData(bagArray, reqCategoryIds, fields) {
  // Refactor relic:
  const isIncludeDate = false;

  const categories = getCollection(constants.codes.categories);
  const events = isIncludeDate ? getCollection(constants.codes.events) : -1;

  const data = {};
  /* data = {
   *   id1: { // this is the id of the category
   *     field1: valueFound,
   *     field2: valueFound,
   *     field3: ...,
   *   },
   *   id2: {
   *     field1: valueFound,
   *     field2: valueFound,
   *     field3: ...,
   *   },
   *   id3: {
   *     field1: valueFound,
   *     field2: valueFound,
   *     field3: ...,
   *   },
   *   id4: {},
   *   ...
   * }
   */

  reqCategoryIds.forEach(function (id) {
    data[id] = {};

    fields.forEach(function (field) {
      data[id][field] = 0;
    });
  });

  if (bagArray.length < 1) return;
  bagArray.forEach(function (bag) {
    let id = bag.category_id;
    if (!(id in data)) id = getClosestParentId(id, reqCategoryIds, categories);
    data[id].label = categories.find(category => category._id === id).name;
    if (isIncludeDate) data[id].date = events.find(event => event._id === bag.event_id).date;

    fields.forEach(function (field) {
      data[id][field] += bag[field];
    });
  });

  if (isIncludeDate) {
    Object.keys(data).forEach(function (key) {
      const datum = data[key];
      if (!('date' in datum)) delete data[key];
    });
  }

  return data;
}

export function join(collection, field, foreignField = '_id', foreignCollection) {
  const data = _.clone(collection);
  return data.map(
      function (doc) {
        return { ...foreignCollection.find(fDoc => fDoc[foreignField] === doc[field]), ...doc };
      },
  );
}

function toNoonDate(d) {
  const nd = new Date(+d);
  nd.setHours(12, 0, 0, 0);
  return nd;
}

function diffDays(firstDate, secondDate) {
  // Copy dates so don't affect originals
  // const d0 = new Date(+firstDate);
  // const d1 = new Date(+secondDate);

  // Set to noon
  // d0.setHours(12, 0, 0, 0);
  // d1.setHours(12, 0, 0, 0);

  const d0 = toNoonDate(firstDate);
  const d1 = toNoonDate(secondDate);

  // Get difference in whole days, divide by milliseconds in one day
  // and round to remove any daylight saving boundary effects
  return Math.round((d1 - d0) / 8.64e7);
}


// Takes an object from buildCompositionData() and formats it for display in a line graph component
export function formatTransitionData(
    startDate = getEarliestDate(),
    endDate = getLatestDate(),
    fieldName = 'weight',
    collectionOption = constants.codes.trashBags,
    bagCollection = getCollection(constants.codes.trashBags),
    eventCollection = getCollection(constants.codes.events),
) {
  // console.log('formatTransitionData: earliestDate, latestDate');
  // console.log(getEarliestDate());
  // console.log(getLatestDate());
  const isLength = (fieldName === 'length');
  const returnArray = [];
  const bagArr = getTrashBagsByDate(startDate, endDate, bagCollection);
  const eventsArr = getEventsByDate(startDate, endDate, eventCollection);
  let dated = [];

  // console.log('formatTransitionData: bagArr, eventsArr');
  // console.log(bagArr);
  // console.log(eventsArr);

  switch (collectionOption) {
    case (constants.codes.events):
      dated = eventsArr;
      break;

    case (constants.codes.trashBags):
      dated = join(bagArr, 'event_id', '_id', eventsArr);
      break;

    default:
      throw 'formatTransitionData: illegal value for collectionOption';
  }

  dated.forEach(function (doc) {
    // if (returnArray.find( dataPoint => dataPoint.x === toNoonDate(doc.date)) === undefined) {
      const graphObj = { x: toNoonDate(doc.date), y: 0 };
    const existingPoint = returnArray.find(dataPoint => +dataPoint.x === +graphObj.x);
    if (!(existingPoint === undefined)) { graphObj.y = existingPoint.y; }
    // }

      if (!(diffDays(doc.date, graphObj.x))) { graphObj.y = isLength ? 1 : doc[fieldName]; }

    if (existingPoint === undefined) {
      returnArray.push(graphObj);
    } else {
      existingPoint.y += graphObj.y;
    }
  });

  returnArray.sort((a, b) => ((a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0)));
  return returnArray;
}

/** Returns random number between min and max (default 1, 100)
 *
 * @param min
 * @param max
 * @returns {number}
 */
export function randNum(min = 1, max = 100) {
  return Math.floor((Math.random() * (max)) + min);
}

/**
 * Generates randomized data for testing and debugging. By default, it creates
 * 1 new event 1 day after the most recent event and 4 TrashBags under the event.
 * Category, location, and building are chosen randomly unless the default booleans are overridden,
 * at which point the new bags will be created with those newly created values.
 *
 * @param numBags
 * @param isNewChildCategory
 * @param isNewRootCategory
 * @param isNewLocation
 * @param isNewBuilding
 */
export function generateRandomData(
    numBags = 4,
    isNewChildCategory = false,
    isNewRootCategory = false,
    isNewLocation = false,
    isNewBuilding = false,
) {
  const categories = getCollection(constants.codes.categories);
  const locations = getCollection(constants.codes.locations);
  const buildings = getCollection(constants.codes.buildings);
  const events = getCollection(constants.codes.events);
  // const nowDate = new Date();
  const latestDate = getLatestDate();
  const eventDate = latestDate.setDate(latestDate.getDate() + 1);

  const form_id = addNewForm(eventDate);

  const randCategory = categories.length === 0 || isNewRootCategory ?
      { _id: 0 }
      : categories[randNum(0, categories.length - 1)];

  const newCategoryName = isNewRootCategory ?
      `newRootCat${(categories.length + 1).toString()}`
      : `newChildCat${(categories.length + 1).toString()}`;

  const category_id =
      isNewChildCategory || isNewRootCategory || categories.length === 0 ?
          addNewCategory(newCategoryName, randCategory._id)
          : randCategory._id;

  // const study_id = db.addNewStudy(
  // addNewStudy(
  //     (`testStudy${randNum(100).toString()}`),
  //     _.pluck(categories, '_id'),
  //     getEarliestDate(),
  // );

  const location_id =
      isNewLocation || locations.length === 0 ?
          addNewLocation(
              `testLoc${(locations.length + 1).toString()}`,
              `${randNum(11, 4242).toString()} Street St.`,
              'Honolulu',
              'HI',
              '96817',
          )
          : locations[randNum(0, locations.length - 1)]._id;

  const building_id =
      isNewBuilding || buildings.length === 0 ?
          addNewBuilding(`Testing Hall ${(buildings.length + 1).toString()}`, location_id)
          : buildings[randNum(0, buildings.length - 1)]._id;

  const event_id = addNewEvent(`testEvent${(events.length + 1).toString()}`, eventDate);

  for (let i = 0; i < numBags; i++) {
    // const bag_id = addNewTrashBag(
    addNewTrashBag(
        event_id,
        building_id,
        location_id,
        category_id,
        form_id,
        randNum(), randNum(), randNum(),
    );
  }
  console.log(`${numBags} bags generated`);
}

/**
 * Removes all data in all collections except the required 'other' category
 */
export function clearAllDocumentsAllCollections() {
  getCollection(constants.codes.locations).map(doc => Locations.remove({ _id: doc._id }));
  getCollection(constants.codes.buildings).map(doc => Buildings.remove({ _id: doc._id }));
  getCollection(constants.codes.events).map(doc => Events.remove({ _id: doc._id }));
  getCollection(constants.codes.trashBags).map(doc => TrashBags.remove({ _id: doc._id }));
  getCollection(constants.codes.forms).map(doc => Forms.remove({ _id: doc._id }));
  getCollection(constants.codes.studies).map(doc => Studies.remove({ _id: doc._id }));
  getCollection(constants.codes.categories).map(doc => {
    if (doc.name !== 'other') {
      Categories.remove({ _id: doc._id });
    }
    return true;
  });
}

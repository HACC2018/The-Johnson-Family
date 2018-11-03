import { Meteor } from 'meteor/meteor';
import { Locations } from '../../api/Locations/Locations';


/** This subscription publishes all documents within the Location collection, can be changed once admin permissions are added. */
Meteor.publish('Locations', function publish() {
  return Locations.find();
});

function addData(data) {
  console.log(`  Adding`);
  Locations.insert(data);
}

if (Locations.find().count() === 0) {
  if (Meteor.settings.defaultLocations) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Locations', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Locations.find();
  }
  return this.ready();
});


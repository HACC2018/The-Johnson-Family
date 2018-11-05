import { Meteor } from 'meteor/meteor';
import { Locations } from '../../api/Locations/Locations';

/** This subscription publishes all documents within the Location collection, can be changed once admin permissions are added. */
Meteor.publish('Locations', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Locations.find({ owner: username });
  }
  return this.ready();
});



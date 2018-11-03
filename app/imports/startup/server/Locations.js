import { Meteor } from 'meteor/meteor';
import { Locations } from '../../api/Locations/Locations';


/** This subscription publishes all documents withing the Location collection, can be changed once admin permissions are added. */
Meteor.publish('Locations', function publish() {
  return Locations.find();
});

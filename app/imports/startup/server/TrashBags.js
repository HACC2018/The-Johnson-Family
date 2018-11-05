import { Meteor } from 'meteor/meteor';
import { TrashBags } from '../../api/TrashBags/TrashBags';


/** This subscription publishes all documents within the TrashBags collection, can be changed once admin permissions are added. */
Meteor.publish('TrashBags', function publish() {
  return TrashBags.find();
});

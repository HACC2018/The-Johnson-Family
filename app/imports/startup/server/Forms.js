import { Meteor } from 'meteor/meteor';
import { Forms } from '../../api/Forms/Forms';
/** This subscription publishes all documents withing the Forms collection, can be changed once admin permissions are added. */
Meteor.publish('Forms', function publish() {
  return Forms.find();
});

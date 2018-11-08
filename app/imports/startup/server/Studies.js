import { Meteor } from 'meteor/meteor';
import { Studies } from '../../api/Studies/Studies';


/** This subscription publishes all documents within the Studies collection, can be changed once admin permissions are added. */
Meteor.publish('Studies', function publish() {
  return Studies.find();
});

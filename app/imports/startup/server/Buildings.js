import { Meteor } from 'meteor/meteor';
import { Buildings } from '../../api/Buildings/Buildings';

/** This subscription publishes all documents within the building collection, can be changed once admin permissions are added. */
Meteor.publish('Buildings', function publish() {
  return Buildings.find();
});

import { Meteor } from 'meteor/meteor';
import { Events } from '../../api/Events/Events';
/** This subscription publishes all documents withing the Events collection, can be changed once admin permissions are added. */
Meteor.publish('Events', function publish() {
  return Events.find();
});

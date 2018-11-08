import { Meteor } from 'meteor/meteor';
import { Categories } from '../../api/Categories/Categories';
/** This subscription publishes all documents within the Categories collection, can be changed once admin permissions are added. */
Meteor.publish('Categories', function publish() {
  return Categories.find();
});

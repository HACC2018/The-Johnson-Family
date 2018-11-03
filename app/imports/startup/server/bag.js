import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Bags } from '../../api/bag/bag.js';

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.id} (${data.owner})`);
  Bags.insert(data);
}

/** Initialize the collection if empty. */
if (Bags.find().count() === 0) {
  if (Meteor.settings.defaultBags) {
    console.log('Creating default data.');
    Meteor.settings.defaultBags.map(data => addData(data));
  }
}

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Bags', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Bags.find({ owner: username });
  }
  return this.ready();
});

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish('BagsAdmin', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Bags.find();
  }
  return this.ready();
});

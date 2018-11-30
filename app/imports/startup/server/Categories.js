import { Meteor } from 'meteor/meteor';
import { Categories } from '../../api/Categories/Categories';
import { addNewCategory } from '../../api/Wrapper/Wrapper';

/** This subscription publishes all documents within the Categories collection,
 *  can be changed once admin permissions are added. */

if (Categories.find().count() === 0) {
    console.log('Creating default category "other".');
    addNewCategory('other', 0);
}

Meteor.publish('Categories', function publish() {
  return Categories.find();
});

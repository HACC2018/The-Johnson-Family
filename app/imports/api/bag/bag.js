import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Bags = new Mongo.Collection('Bags');

/** Create a schema to constrain the structure of documents associated with this collection. */
const BagSchema = new SimpleSchema({
  id: String,
  type: {
    type: String,
    allowedValues: ['plastic bottle', 'option2', 'option3', 'option4'],
  },
  weight: Number,
  volume: Number,
  owner: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Bags.attachSchema(BagSchema);

/** Make the collection and schema available to other code. */
export { Bags, BagSchema };

import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Buildings = new Mongo.Collection('Buildings');

/** Create a schema to constrain the structure of documents associated with this collection. */
const BuildingsSchema = new SimpleSchema({
  name: String,
  location_id: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Buildings.attachSchema(BuildingsSchema);

/** Make the collection and schema available to other code. */
export { Buildings, BuildingsSchema };

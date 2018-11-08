import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Studies = new Mongo.Collection('Studies');

/** Create a schema to constrain the structure of documents associated with this collection. */
const StudiesSchema = new SimpleSchema({
  name: String,
  category_id: Number, //should be array
  start_date: Date,
  end_date: Date,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Studies.attachSchema(StudiesSchema);

/** Make the collection and schema available to other code. */
export { Studies, StudiesSchema };

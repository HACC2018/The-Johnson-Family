import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Forms = new Mongo.Collection('Forms');

/** Create a schema to constrain the structure of documents associated with this collection. */
const FormsSchema = new SimpleSchema({
  date: Date,
  form_id: Number,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Forms.attachSchema(FormsSchema);

/** Make the collection and schema available to other code. */
export { Forms, FormsSchema };

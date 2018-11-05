import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Locations = new Mongo.Collection('Locations');

/** Create a schema to constrain the structure of documents associated with this collection. */
const LocationsSchema = new SimpleSchema({
  name: String,
  street: String,
  city: String,
  state: String,
  zip_code: SimpleSchema.Integer,
  owner: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Locations.attachSchema(LocationsSchema);

/** Make the collection and schema available to other code. */
export { Locations, LocationsSchema };

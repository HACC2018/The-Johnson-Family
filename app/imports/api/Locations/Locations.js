import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Locations = new Mongo.Collection('Locations');
const states = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];

/** Create a schema to constrain the structure of documents associated with this collection. */
const LocationsSchema = new SimpleSchema({
  name: String,
  street: String,
  city: String,
  state: {
    type: String,
    allowedValues: states,
    defaultValue: 'Hawaii',
  },
  zip_code: SimpleSchema.Integer,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Locations.attachSchema(LocationsSchema);

/** Make the collection and schema available to other code. */
export { Locations, LocationsSchema };

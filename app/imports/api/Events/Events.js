import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Events = new Mongo.Collection('Events');

/** Create a schema to constrain the structure of documents associated with this collection. */
const EventsSchema = new SimpleSchema({
  name: String,
  date: Date,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Events.attachSchema(EventsSchema);

/** Make the collection and schema available to other code. */
export { Events, EventsSchema };

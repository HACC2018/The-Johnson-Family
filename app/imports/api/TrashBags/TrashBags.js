import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const TrashBags = new Mongo.Collection('TrashBags');

/** Create a schema to constrain the structure of documents associated with this collection. */
const TrashBagsSchema = new SimpleSchema({
  event_id: String,
  building_id: String,
  category_id: String,
  location_id: String,
  form_id: String,
  accepted: Boolean,
  weight: Number,
  volume: Number,
  count: SimpleSchema.Integer,
  notes: {
    type: String,
    max: 1000,
  },
}, { tracker: Tracker });

/** Attach this schema to the collection. */
TrashBags.attachSchema(TrashBagsSchema);


/** Make the collection and schema available to other code. */
export { TrashBags, TrashBagsSchema };

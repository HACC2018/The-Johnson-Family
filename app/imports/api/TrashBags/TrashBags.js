import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';
import { Studies } from '/imports/api/Studies/Studies'

/** Create a Meteor collection. */
const TrashBags = new Mongo.Collection('TrashBags');

/** Create a schema to constrain the structure of documents associated with this collection. */
const TrashBagsSchema = new SimpleSchema({
  event: String,
  study_id: String,
  event_id: String,
  building_id: String,
  category_id: String,
  form_id: String,
  accepted: Boolean,
  weight: Number,
  volume: Number,
  count: SimpleSchema.Integer,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
TrashBags.attachSchema(TrashBagsSchema);


/** Make the collection and schema available to other code. */
export { TrashBags, TrashBagsSchema };

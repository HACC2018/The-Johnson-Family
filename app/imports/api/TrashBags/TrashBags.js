import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';
import { Studies } from '/imports/api/Studies/Studies'

/** Create a Meteor collection. */
const TrashBags = new Mongo.Collection('TrashBags');

/** Create a schema to constrain the structure of documents associated with this collection. */
const TrashBagsSchema = new SimpleSchema({
  category_id: {
    type: String,
    allowedValues: ['plastic bottle', 'option2', 'option3', 'option4'],
    defaultValue: 'plastic bottle',
  },
  weight: Number,
  volume: Number,
  count: SimpleSchema.Integer,
  event_id: {
    type: String,
    allowedValues: ['plastic bottle', 'option2', 'option3', 'option4'],
    defaultValue: 'plastic bottle',
  },
  location_id: {
    type: String,
    allowedValues: ['plastic bottle', 'option2', 'option3', 'option4'],
    defaultValue: 'plastic bottle',
  },
  building_id: {
    type: String,
    allowedValues: ['plastic bottle', 'option2', 'option3', 'option4'],
    defaultValue: 'plastic bottle',
  },
  accepted: Boolean,
  owner: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
TrashBags.attachSchema(TrashBagsSchema);


/** Make the collection and schema available to other code. */
export { TrashBags, TrashBagsSchema };

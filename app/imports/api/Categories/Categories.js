import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Categories = new Mongo.Collection('Categories');

/** Create a schema to constrain the structure of documents associated with this collection. */
const CategoriesSchema = new SimpleSchema({
  name: String,
  subcategory: {
    type: String,
    optional: true,
  },
  parent_id: String,
  level: SimpleSchema.Integer,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Categories.attachSchema(CategoriesSchema);

/** Make the collection and schema available to other code. */
export { Categories, CategoriesSchema };

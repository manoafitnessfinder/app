import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const Events = new Mongo.Collection('Events');

/** Define a schema to specify the structure of each document in the collection. */
const EventSchema = new SimpleSchema({
  date: Date,
  type: {
    type: String,
    allowedValues: ['Running', 'Lifting', 'Acrobatics', 'Calisthenics',
      'Walking', 'Hiking', 'Climbing', 'Surfing', 'Yoga', 'Volleyball', 'Basketball',
      'Baseball', 'Badminton', 'Tennis', 'Swimming', 'Dodgeball', 'Soccer', 'Other'],
    defaultValue: 'Walking',
  },
  location: String,
  associated: {
    type: String,
    optional: true,
  },
  notes: {
    type: String,
    optional: true,
  },
  owner: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Events.attachSchema(EventSchema);

/** Make the collection and schema available to other code. */
export { Events, EventSchema };

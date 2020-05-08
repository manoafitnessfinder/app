import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const Profiles = new Mongo.Collection('Profiles');

/** Define a schema to specify the structure of each document in the collection. */
const ProfileSchema = new SimpleSchema({
  name: String,
  age: { type: String, defaultValue: '' },
  image: { type: String, defaultValue: '' },
  description: { type: String, defaultValue: '' },
  gender: {
    type: String,
    allowedValues: ['Male', 'Female', 'Undefined'],
    defaultValue: 'Undefined',
  },
  interests: {
    type: Array,
    defaultValue: 'Running',
  },
  'interests.$': {
    type: String, allowedValues: ['Running', 'Lifting', 'Acrobatics', 'Calisthenics',
      'Walking', 'Hiking', 'Climbing', 'Surfing', 'Yoga', 'Volleyball', 'Basketball',
      'Baseball', 'Badminton', 'Tennis', 'Swimming', 'Dodgeball', 'Soccer'],
  },
  seeking: {
    type: String,
    allowedValues: ['Gym Buddy', 'Mentor', 'Mentee', 'No Preference'],
    defaultValue: 'No Preference',
  },
  level: {
    type: String,
    allowedValues: ['Beginner', 'Intermediate', 'Advanced'],
    defaultValue: 'Beginner',
  },
  goals: { type: String, defaultValue: '' },
  owner: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Profiles.attachSchema(ProfileSchema);

/** Make the collection and schema available to other code. */
export { Profiles, ProfileSchema };

import { Mongo } from 'meteor/mongo';
import { Tracker } from 'meteor/tracker';
import SimpleSchema from 'simpl-schema';

/** Define a Mongo collection to hold the data. */
const Friends = new Mongo.Collection('Friends');

/** Define a schema to specify the structure of each document in the collection. */
const FriendSchema = new SimpleSchema({
  owner: String, /** This is the person who's currently logged in * */
  contactId: String, /** This is the friend you are adding. * */
  friendEmail: String, /** This is to make events work, this is the friends email * */
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Friends.attachSchema(FriendSchema);

/** Make the collection and schema available to other code. */
export { Friends, FriendSchema };

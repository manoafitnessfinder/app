import { Mongo } from 'meteor/mongo';
import { Tracker } from 'meteor/tracker';
import SimpleSchema from 'simpl-schema';

/** Define a Mongo collection to hold the data. */
const Attending = new Mongo.Collection('Attending');

/** Define a schema to specify the structure of each document in the collection. */
const AttendingSchema = new SimpleSchema({
  eventId: String, /** This is the ID of the event you are attending. * */
  otherEmail: String, /** This is the email of the person attending * */
  otherName: String, /** This is the name of the person attending * */
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Attending.attachSchema(AttendingSchema);

/** Make the collection and schema available to other code. */
export { Attending, AttendingSchema };

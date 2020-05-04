import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Stuffs } from '../../api/stuff/Stuff';
import { Profiles } from '../../api/profile/Profile';
import { Friends } from '../../api/friend/Friend';
import { Events } from '../../api/event/Events.js';
import { Notes} from '../../api/note/Notes';

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Stuff', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Stuffs.find({ owner: username });
  }
  return this.ready();
});

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish('StuffAdmin', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Stuffs.find();
  }
  return this.ready();
});

Meteor.publish('Profiles', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Profiles.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish('AllProfiles', function publish() {
  const username = Meteor.users.findOne(this.userId).username;
  return Profiles.find({ owner: { $ne: username } });
});

Meteor.publish('Events', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Events.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish('Friends', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Friends.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish('Notes', function publish() {
  if (this.userId) {
    return Notes.find();
  }
  return this.ready();
});

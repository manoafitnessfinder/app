import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../api/profile/Profile';
import { Friends } from '../../api/friend/Friend';
import { Events } from '../../api/event/Events.js';
import { Notes } from '../../api/note/Notes';

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

Meteor.publish('TestProfiles', function publish() {
  if (this.userId) {
    return Profiles.find();
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

Meteor.publish('Events', function publish() {
  if (this.userId) {
    return Events.find({});
  }
  return this.ready();
});

Meteor.publish('AllEvents', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Events.find({ owner: { $ne: username } });
  }
  return this.ready();
});

Meteor.publish('Notes', function publish() {
  if (this.userId) {
    return Notes.find();
  }
  return this.ready();
});

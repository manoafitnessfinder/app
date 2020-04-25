import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Profiles } from '../../api/profile/Profile.js';
import { Events } from '../../api/event/Events.js';

/* eslint-disable no-console */

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.insert(data);
}

/** Initialize the collection if empty. */
if (Stuffs.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

function addProfile(data) {
  console.log(`  Adding: ${data.description} for (${data.owner})`);
  Profiles.insert(data);
}

/** Initialize the collection if empty. */
if (Profiles.find().count() === 0) {
  if (Meteor.settings.defaultProfile) {
    console.log('Creating default profile for John@Foo.com.');
    Meteor.settings.defaultProfile.map(data => addProfile(data));
  }
}

function addEvents(data) {
  console.log(`  Adding: ${data.date} for (${data.time})`);
  Events.insert(data);
}


if (Events.find().count() === 0) {
  if (Meteor.settings.defaultEvents) {
    console.log('Creating default events.');
    Meteor.settings.defaultEvents.map(data => addEvents(data));
  }
}

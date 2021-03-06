import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../api/profile/Profile.js';
import { Events } from '../../api/event/Events.js';

/* eslint-disable no-console */

function addProfile(data) {
  console.log(`  Adding: ${data.name} for (${data.owner})`);
  Profiles.insert(data);
}

if (Profiles.find().count() === 0) {
  if (Meteor.settings.defaultProfile) {
    console.log('Creating default profile for John@Foo.com.');
    Meteor.settings.defaultProfile.map(data => addProfile(data));
  }
}

/* The code below was copied from bowfolios. */
/**
 * If the loadAssetsFile field in settings.development.json is true, then load the data in private/data.json.
 * This approach allows you to initialize your system with large amounts of data.
 * Note that settings.development.json is limited to 64,000 characters.
 * We use the "Assets" capability in Meteor.
 * For more info on assets, see https://docs.meteor.com/api/assets.html
 * User count check is to make sure we don't load the file twice, which would generate errors due to duplicate info.
 */
if ((Meteor.settings.loadAssetsFile) && (Profiles.find().count() < 100)) {
  const assetsFileName = 'data.json';
  console.log(`Loading data from private/${assetsFileName}`);
  const jsonData = JSON.parse(Assets.getText(assetsFileName));
  jsonData.profiles.map(profile => addProfile(profile));
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

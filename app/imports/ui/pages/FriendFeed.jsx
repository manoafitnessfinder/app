import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Loader, Segment, Divider, Header, Card, Container, Image } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import Event from '/imports/ui/components/Event';
import { _ } from 'meteor/underscore';
import { Events } from '../../api/event/Events';
import FriendsList from '../components/Friends';
import { Profiles } from '../../api/profile/Profile.js';
import { Friends } from '../../api/friend/Friend.js';


/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class FriendFeed extends React.Component {
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Container className = 'imagePadding'>
            <Image style={ { width: '987px', height: '250px' }} centered src="/images/listFriend.PNG"/>
          </Container>
          <Card.Group centered>
            {this.props.friendEv.map((event, index) => <Event key={index} event={event}/>)}
          </Card.Group>
        </Container>
    );
  }
}

FriendFeed.propTypes = {
  friendEv: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components.
 https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  const sub1 = Meteor.subscribe('Friends');
  const sub2 = Meteor.subscribe('AllEvents');
  var friendNames = Friends.find({}).fetch();
  var friend2 = Friends.find({}, { contactId: 1 }).fetch();
  console.log(_.pluck(friend2, 'contactId'));
  console.log(friendNames);
  return {
    friendEv: Events.find({ owner: { $in: friend2 }}).fetch(),
    ready: sub1.ready(),
  };
})(FriendFeed);

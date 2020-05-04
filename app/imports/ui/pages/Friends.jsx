import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Card, Image } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import FriendsList from '../components/Friends';
import { Profiles } from '../../api/profile/Profile.js';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class FriendsPage extends React.Component {
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    console.log(Profiles.find().count());
    return (
        <Container>
          <Container className = 'imagePadding'>
            <Image style={ { width: '987px', height: '250px' }} centered src="/images/listFriend.PNG"/>
          </Container>
          <Card.Group centered>
            {this.props.profiles.map((profile, index) => <FriendsList key={index} profile={profile}/>)}
          </Card.Group>
        </Container>
    );
  }
}

FriendsPage.propTypes = {
  profiles: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subscriptionFriends = Meteor.subscribe('AllProfiles');
  return {
    profiles: Profiles.find({}).fetch(),
    ready: subscriptionFriends.ready(),
  };
})(FriendsPage);

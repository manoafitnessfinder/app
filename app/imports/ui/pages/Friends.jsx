import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card } from 'semantic-ui-react';
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
    return (
        <Container>
          <Header as="h2" textAlign="center" inverted>List Friends</Header>
          <Card.Group>
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

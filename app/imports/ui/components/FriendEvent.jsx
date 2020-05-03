import React from 'react';
import { Card, Icon, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import moment from 'moment';
import 'moment-timezone';
import { Friends } from '../../api/friend/Friend';
import { Profiles } from '../../api/profile/Profile';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class FriendEvent extends React.Component {
  removeItem(docID) {
    this.props.Events.remove(docID);
  }

  render() {
    if (Friends.findOne({ friendEmail: this.props.event.owner })) {
      return (
          <Card color='green' centered>
            <Card.Content>
              <Header as='h3'>
                {moment(this.props.event.date).add(10, 'hours').format('MM/DD/YYYY')}<br/>
                @ {moment(this.props.event.date).add(10, 'hours').format('hh:mm A')}<br/>
              </Header>
            </Card.Content>
            <Card.Content extra>
              {this.props.event.owner}
            </Card.Content>
            <Card.Content>
              <Icon name='thumbtack'/> {this.props.event.type}<br/>
              <Icon name='location arrow'/> {this.props.event.location}<br/>
              <Icon name='user plus'/> {this.props.event.associated}<br/>
            </Card.Content>
            <Card.Content>
              <b>NOTES</b><br/>
              {this.props.event.notes}
            </Card.Content>
          </Card>
      );
    }
    return (<h3></h3>);
  }
}

/** Require a document to be passed to this component. */
FriendEvent.propTypes = {
  event: PropTypes.object.isRequired,
  Events: PropTypes.object.isRequired,
  friends: PropTypes.array.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withTracker(() => {
  const subscriptionFriends = Meteor.subscribe('Friends');
  const subscriptionsProfile = Meteor.subscribe('Profiles');
  return {
    friends: Friends.find({}).fetch(),
    profile: Profiles.find({}).fetch(),
    ready: subscriptionFriends.ready() && subscriptionsProfile.ready(),
  };
})(FriendEvent);

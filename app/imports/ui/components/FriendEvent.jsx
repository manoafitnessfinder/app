import React from 'react';
import { Card, Icon, Header, Feed } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import moment from 'moment';
import 'moment-timezone';
import { Friends } from '../../api/friend/Friend';
import { Profiles } from '../../api/profile/Profile';
import { Attending } from '../../api/attending/Attending';
import AttendEvent from './AttendingEvent';
import Attend from './Attend';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class FriendEvent extends React.Component {
  removeItem(docID) {
    this.props.Events.remove(docID);
  }

  render() {
    const test = Profiles.find({ owner: this.props.event.owner }).fetch();
    const profile = test[0];
    let button;
    if (Friends.findOne({ friendEmail: this.props.event.owner })) {
      let testing = (_.where(this.props.attending, { eventId: this.props.event._id }));
      testing = (_.findWhere(testing, { otherEmail: Meteor.user().username }));
      if (testing === undefined) { testing = ''; }
      if (testing.otherEmail === Meteor.user().username) {
        button = <h3/>;
      } else {
        button = <AttendEvent eventId={this.props.event._id}
                              anotherprofile={this.props.currentUser[0]}/>;
      }
      return (
          <Card color='green' centered>
            <Card.Content>
              <Header as='h3'>
                {moment(this.props.event.date).add(10, 'hours').format('MM/DD/YYYY')}<br/>
                @ {moment(this.props.event.date).add(10, 'hours').format('hh:mm A')}<br/>
              </Header>
            </Card.Content>
            <Card.Content extra>
              <Icon name='user circle'/> {profile.name}
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
            {button}
            <Card.Content>
              <b>Attending This event:</b>
              <Feed>
                {this.props.attending.map((attending, index) => <Attend key={index} attending={attending}
                                                                        event={this.props.event}/>)}
              </Feed>
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
  friends: PropTypes.array.isRequired,
  currentUser: PropTypes.array.isRequired,
  attending: PropTypes.string.isRequired,
  Events: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withTracker(() => {
  const subscription = Meteor.subscribe('TestProfiles');
  const subscriptionFriends = Meteor.subscribe('Friends');
  const subscriptionAttending = Meteor.subscribe('Attending');
  const currentUser = Meteor.user() ? Meteor.user().username : '';
  return {
    friends: Friends.find({}).fetch(),
    currentUser: Profiles.find({ owner: currentUser }).fetch(),
    attending: Attending.find({}).fetch(),
    ready: subscriptionFriends.ready() && subscription.ready() && subscriptionAttending.ready(),
  };
})(FriendEvent);

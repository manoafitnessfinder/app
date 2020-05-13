import React from 'react';
import { Card, Icon, Header, Feed } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import moment from 'moment';
import 'moment-timezone';
import { Friends } from '../../api/friend/Friend';
import { Profiles } from '../../api/profile/Profile';
import { Attending } from '../../api/attending/Attending';
import Attend from './Attend';
import { Events } from '../../api/event/Events';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Event extends React.Component {
  removeItem(docID) {
    Events.remove(docID);
  }

  render() {
    if (Profiles.findOne({ owner: this.props.event.owner })) {
      return (
          <Card color='green' centered>
            <Card.Content>
              <Header as='h3'>
                {moment(this.props.event.date).add(10, 'hours').format('MM/DD/YYYY')}<br/>
                @ {moment(this.props.event.date).add(10, 'hours').format('hh:mm A')}<br/>
              </Header>
            </Card.Content>
            <Card.Content>
              <Icon name='thumbtack'/> {this.props.event.type}<br/>
              <Icon name='location arrow'/> {this.props.event.location}<br/>
              {/* <Icon name='user plus'/> {this.props.event.associated}<br/> */}
            </Card.Content>
            <Card.Content>
              <b>NOTES</b><br/>
              {this.props.event.notes}
            </Card.Content>
            <Card.Content>
              <b>ATTENDING THIS EVENT:</b>
              <Feed>
                {this.props.attending.map((attending, index) => <Attend key={index} attending={attending}
                                                                        event={this.props.event}/>)}
              </Feed>
            </Card.Content>
            <Card.Content extra textAlign='right'>
              <Icon name='edit'/><Link to={`/editevent/${this.props.event._id}`}>Edit</Link>
              <Icon name='trash'/>
              <a onClick={() => this.removeItem(this.props.event._id)}>Delete</a>
            </Card.Content>
          </Card>
      );
    }
    return (<h3></h3>);
  }
}

/** Require a document to be passed to this component. */
Event.propTypes = {
  event: PropTypes.object.isRequired,
  Events: PropTypes.object.isRequired,
  friends: PropTypes.array.isRequired,
  attending: PropTypes.array.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withTracker(() => {
  const subscriptionFriends = Meteor.subscribe('Friends');
  const subscriptionsProfile = Meteor.subscribe('Profiles');
  const subscriptionAttending = Meteor.subscribe('Attending');
  return {
    friends: Friends.find({}).fetch(),
    profile: Profiles.find({}).fetch(),
    attending: Attending.find({}).fetch(),
    ready: subscriptionFriends.ready() && subscriptionsProfile.ready() && subscriptionAttending.ready(),
  };
})(Event);

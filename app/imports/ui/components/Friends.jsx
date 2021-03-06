import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Friends } from '../../api/friend/Friend';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class FriendsList extends React.Component {
  render() {
    if (Friends.findOne({ contactId: this.props.profile._id })) {
      return (
          <Card color='green' >
            <Image src={this.props.profile.image} wrapped ui={false}/>
            <Card.Content>
              <Card.Header><Link to={`/User/${this.props.profile._id}`}>{this.props.profile.name}</Link></Card.Header>
              <Card.Meta>
                <span className='date'>{this.props.profile.gender} , {this.props.profile.age}</span>
              </Card.Meta>
              <Card.Description>
                {this.props.profile.description.substr(0, 200)} ...
              </Card.Description>
            </Card.Content>
          </Card>
      );
    }
    return (<h3></h3>);
  }
}

/** Require a document to be passed to this component. */
FriendsList.propTypes = {
  profile: PropTypes.object.isRequired,
  friends: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withTracker(() => {
  const subscription = Meteor.subscribe('Friends');
  return {
    friends: Friends.find({}).fetch(),
    ready: subscription.ready(),
  };
})(FriendsList);

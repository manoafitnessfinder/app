import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AddFriend from '../components/AddFriend';
import { Friends } from '../../api/friend/Friend';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class AllProfiles extends React.Component {
  render() {
    let button;
    let thisFriend = _.findWhere(this.props.friends, { contactId: this.props.testprofile._id });
    if (thisFriend === undefined) { thisFriend = ''; }
    if (thisFriend.owner === Meteor.user().username) {
      button = <h3/>;
    } else {
      button = <AddFriend owner={Meteor.user().username} contactId={this.props.testprofile._id}
                          friendEmail={this.props.testprofile.owner}/>;
    }
    return (
        <Card color='green'>
          <Image src={this.props.testprofile.image} wrapped ui={false}/>
          <Card.Content>
            <Card.Header><Link to={`/User/${this.props.testprofile._id}`}>{this.props.testprofile.name}</Link></Card.Header>
            <Card.Meta>
              <span className='date'>{this.props.testprofile.gender} , {this.props.testprofile.age}</span>
            </Card.Meta>
            <Card.Description>
              {this.props.testprofile.description.substr(0, 200)} ...
              <br/>
              <br/>
            </Card.Description>
            <Card.Content textAlign='center' extra>
              {button}
            </Card.Content>
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
AllProfiles.propTypes = {
  testprofile: PropTypes.object.isRequired,
  friends: PropTypes.array.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withTracker(() => {
  const subscription = Meteor.subscribe('Friends');
  return {
    friends: Friends.find({}).fetch(),
    ready: subscription.ready(),
  };
})(AllProfiles);

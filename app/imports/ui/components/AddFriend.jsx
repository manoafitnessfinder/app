import React from 'react';
import { Segment } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { AutoForm, ErrorsField, SubmitField, HiddenField } from 'uniforms-semantic';
import { withTracker } from 'meteor/react-meteor-data';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import { Friends, FriendSchema } from '../../api/friend/Friend';
import { Profiles } from '../../api/profile/Profile';

/** Renders the Page for adding a document. */
class AddFriend extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { owner, contactId } = data;
    Friends.insert({ owner, contactId },
        (error) => {
          if (error) {
            swal('Note Error', error.message, 'error');
          } else {
            swal('Success', `${Profiles.findOne(this._id = contactId).name} +
            ADDED as the friend of ${owner}`, 'success');
            formRef.reset();
          }
        });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    return (
        <AutoForm ref={ref => {
          fRef = ref;
        }} schema={FriendSchema} onSubmit={data => this.submit(data, fRef)}>
          <Segment>
            <SubmitField value='Add Friend'/>
            <ErrorsField/>
            <HiddenField name='owner' value={this.props.owner}/>
            <HiddenField name='contactId' value={this.props.contactId}/>
          </Segment>
        </AutoForm>
    );
  }
}

AddFriend.propTypes = {
  owner: PropTypes.string.isRequired,
  contactId: PropTypes.string.isRequired,
  profiles: PropTypes.array.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('AllProfiles');
  return {
    profiles: Profiles.find({}).fetch(),
    ready: subscription.ready(),
  };
})(AddFriend);

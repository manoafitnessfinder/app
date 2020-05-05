import React from 'react';
import { Grid, Loader, Header, Segment, Divider } from 'semantic-ui-react';
import swal from 'sweetalert';
import {
  AutoForm, ErrorsField, HiddenField, SelectField, SubmitField,
  TextField, LongTextField, NumField,
} from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import MultiSelectField from '../forms/controllers/MultiSelectField';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import { Profiles, ProfileSchema } from '../../api/profile/Profile';

/** Renders the Page for editing a single document. */
class EditProfile extends React.Component {

  /** On successful submit, insert the data. */
  submit(data) {
    const { name, image, description, interests, seeking, level, age, goals, _id } = data;
    Profiles.update(_id, { $set: { name, image, description, interests, seeking, level, age, goals } },
        (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'Your info has been updated successfully', 'success')));
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    return (
        <Grid container centered>
          <Grid.Column>
            <Divider hidden/>
            <Header as="h2" textAlign="center">Edit Profile</Header>
            <AutoForm schema={ProfileSchema} onSubmit={data => this.submit(data)} model={this.props.doc}>
              <Segment inverted className='profileForm' very padded>
                <Header as='h3' textAlign='center'>Profile Information</Header>
                <TextField name='name'/>
                <TextField name='image'/>
                <LongTextField className='descBox' name='description'/>
                <Header as='h3' textAlign='center'>Matching Information</Header>
                <MultiSelectField name='interests'/>
                <Grid className='doubleLine'>
                  <SelectField className = 'dropDownFix' name='seeking'/>
                  <SelectField className = 'dropDownFix' name='level'/>
                  <NumField className = 'dropDownFix' name = 'age'/>
                </Grid>
                <TextField name='goals'/>
                <Grid centered>
                  <SubmitField className='editProfileButton' value='Submit Changes'/>
                </Grid>
                <ErrorsField/>
                <HiddenField name='owner'/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

EditProfile.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(({ match }) => {
  const documentId = match.params._id;
  const subscription = Meteor.subscribe('Profiles');
  return {
    doc: Profiles.findOne(documentId),
    ready: subscription.ready(),
  };
})(EditProfile);

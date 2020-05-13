import React from 'react';
import { Grid, Loader, Header, Segment, Divider } from 'semantic-ui-react';
import swal from 'sweetalert';
import {
  AutoForm, ErrorsField, HiddenField, SelectField, SubmitField,
  TextField, LongTextField, NumField,
} from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import MultiSelectField from '../forms/controllers/MultiSelectField';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import { Profiles, ProfileSchema } from '../../api/profile/Profile';

/** Renders the Page for editing a single document. */
class EditProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '', redirectToReferer: false };
  }

  /** On successful submit, insert the data. */
  submit(data) {
    const { name, image, description, interests, seeking, level, age, goals, _id } = data;
    Profiles.update(_id, { $set: { name, image, description, interests, seeking, level, age, goals } },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            this.setState({ error: '', redirectToReferer: true });
          }
        });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    const { from } = this.props.location.state || { from: { pathname: /profile/ } };
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    return (
        <Grid container centered>
          <Grid.Column>
            <Divider hidden/>
            <Header as="h2" textAlign="center">Edit Profile</Header>
            <AutoForm schema={ProfileSchema} onSubmit={data => this.submit(data)} model={this.props.doc}>
              <Segment inverted className='profileForm' very padded>
                <Header as='h3' textAlign='center'>Profile Information</Header>
                <Grid className='doubleLine'>
                  <TextField name='name'/>
                  <SelectField name='gender'/>
                </Grid>
                <TextField name='image' label='Image (URL)'/>
                <LongTextField className='descBox' name='description'/>
                <Header as='h3' textAlign='center'>Matching Information</Header>
                <MultiSelectField name='interests'/>
                <Grid className='doubleLine'>
                  <SelectField className='dropDownFix' name='seeking'/>
                  <SelectField className='dropDownFix' name='level'/>
                  <NumField name='age'/>
                </Grid>
                <TextField name='goals'/>
                <SubmitField className='editProfileButton' value='Submit Changes'/>
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
  location: PropTypes.object,
  profiles: PropTypes.array.isRequired,
};

export default withTracker(({ match }) => {
  const documentId = match.params._id;
  const subscription = Meteor.subscribe('Profiles');
  return {
    doc: Profiles.findOne(documentId),
    ready: subscription.ready(),
  };
})(EditProfile);

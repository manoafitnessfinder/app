import React from 'react';
import { Grid, Loader, Header, Segment, Divider } from 'semantic-ui-react';
import swal from 'sweetalert';
import {
  AutoForm, ErrorsField, HiddenField, SelectField, SubmitField,
  TextField, LongTextField, DateField,
} from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import { Redirect } from 'react-router-dom';
import { Events, EventSchema } from '../../api/event/Events';

/** Renders the Page for editing a single document. */
class EditEvent extends React.Component {

  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '', redirectToReferer: false };
  }

  /** On successful submit, insert the data. */
  submit(data) {
    const { date, type, location, notes, _id } = data;
    Events.update(_id, { $set: { date, type, location, notes } },
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
    const { from } = this.props.location.state || { from: { pathname: /events/ } };
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    return (
        <Grid container centered>
          <Grid.Column>
            <Divider hidden/>
            <AutoForm schema={EventSchema} onSubmit={data => this.submit(data)} model={this.props.doc}>
              <Segment inverted className='profileForm' very padded>
                <Header as='h3' textAlign='center'>Edit Event</Header>
                <DateField name='date' label='Date and Time' />
                <SelectField name='type' label='Event Type' />
                <TextField name='location'/>
                <LongTextField name='notes'/>
                <Divider hidden/>
                <Grid centered>
                  <SubmitField className='editEventButton' value='Submit Changes'/>
                </Grid>
                <ErrorsField/>
                <HiddenField name='owner'/>
                <Divider hidden/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

EditEvent.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  location: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(({ match }) => {
  const documentId = match.params._id;
  const subscription = Meteor.subscribe('Events');
  return {
    doc: Events.findOne(documentId),
    ready: subscription.ready(),
  };
})(EditEvent);

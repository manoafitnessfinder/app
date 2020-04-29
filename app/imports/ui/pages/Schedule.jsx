import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Loader, Segment, Divider, Header, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import swal from 'sweetalert';
import {
  AutoForm, ErrorsField, HiddenField, SelectField, SubmitField,
  TextField, LongTextField, DateField
} from 'uniforms-semantic';
import PropTypes from 'prop-types';
import moment from 'moment';
import MultiSelectField from '../forms/controllers/MultiSelectField';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import Event from '/imports/ui/components/Event';
import SimpleSchema from 'simpl-schema';
import { Events } from '../../api/event/Events';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  date: Date,
  type: {
    type: String,
    allowedValues: ['Run', 'Hike', 'Walk', 'Lift', 'Other'],
    defaultValue: 'Walk',
  },
  location: String,
  associated: String,
  notes: String,
});

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class Schedule extends React.Component {

  /** On successful submit, insert the data. */
  submit(data, formRef) {
    const { date, type, location, associated, notes } = data;
    const owner = Meteor.user().username;
    Events.insert({ date, type, location, associated, notes, owner },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Item added successfully', 'success');
            formRef.reset();
          }
        });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    let fRef = null;
    return (
        <Grid container>
          <Divider hidden/>
          <Grid.Row>
            <Grid.Column width={5}>
              <Divider hidden/>
              <Segment fixed inverted className='scheduleBar'>
                <Header as='h3' textAlign='center'>SCHEDULE A NEW EVENT</Header>
                <AutoForm ref={ref => {
                  fRef = ref;
                }} schema={formSchema} onSubmit={data => this.submit(data, fRef)}>
                  <DateField name='date' label='Date (MM/DD/YY)'/>
                  <SelectField name='type' label='Event Type'/>
                  <TextField name='location'/>
                  <TextField name='associated' label='Include a Friend'/>
                  <LongTextField name='notes'/>
                  <SubmitField className='editProfileButton' value='Submit Changes'/>
                  <ErrorsField/>
                </AutoForm>
              </Segment>
            </Grid.Column>
            <Grid.Column width={11}>
              <Divider horizontal>
                <Header as='h1' textAlign='center'>Upcoming Events</Header>
              </Divider>
              <Card.Group centered>
                {this.props.events.map((event, index) => <Event
                    key={index}
                    event={event}
                    Events={Events}
                />)
                }
              </Card.Group>

              <Divider hidden/>
              <Divider hidden/>

              <Divider horizontal>
                <Header as='h1' textAlign='center'>Past Events</Header>
              </Divider>
              <Card.Group className='pastCards' centered>
                {this.props.events2.map((event, index) => <Event
                    key={index}
                    event={event}
                    Events={Events}
                />)
                }
              </Card.Group>
            </Grid.Column>
          </Grid.Row>
          <Divider hidden/>
        </Grid>
    );
  }
}

Schedule.propTypes = {
  events: PropTypes.array.isRequired,
  events2: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components.
 https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  const subscription = Meteor.subscribe('Events');
  return {
    events: Events.find({
      date: { $gte: new Date() },
    }, { sort: { date: 1 } }).fetch(),
    events2: Events.find({
      date: { $lt: new Date() },
    }, { sort: { date: -1 } }).fetch(),
    ready: subscription.ready(),
  };
})(Schedule);

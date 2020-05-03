import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Loader, Segment, Divider, Header, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import swal from 'sweetalert';
import {
  AutoForm, ErrorsField, SelectField, SubmitField,
  TextField, LongTextField, DateField,
} from 'uniforms-semantic';
import PropTypes from 'prop-types';
import SimpleSchema from 'simpl-schema';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import Event from '/imports/ui/components/Event';
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
  associated: {
    type: String,
    optional: true,
  },
  notes: String,
});

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class Schedule extends React.Component {

  /** On successful submit, insert the data. */
  submit(data, formRef) {
    const { date, type, location, associated, notes } = data;
    const owner = Meteor.user().username;
    console.log(`the owner of this event is ${owner}`);
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
            <Grid.Column textAlign='center' width={5}>
              <Divider hidden/>
              <Segment fixed inverted className='scheduleBar'>
                <Header as='h3' textAlign='center'>SCHEDULE A NEW EVENT</Header>
                <AutoForm ref={ref => {
                  fRef = ref;
                }} schema={formSchema} onSubmit={data => this.submit(data, fRef)}>
                  <DateField className='schedLabel' name='date' label='Date and Time'/>
                  <SelectField className='schedLabel' name='type' label='Event Type'/>
                  <TextField className='schedLabel' name='location'/>
                  <TextField className='schedLabel' name='associated' label='Include a Friend'/>
                  <LongTextField className='schedLabel' name='notes'/>
                  <Divider hidden/>
                  <SubmitField className='scheduleButton' value='CREATE EVENT'/>
                  <ErrorsField/>
                </AutoForm>
                <Divider hidden/>
              </Segment>
            </Grid.Column>
            <Grid.Column width={11}>
              <Divider horizontal>
                <Header as='h1' textAlign='center'>Upcoming Events</Header>
              </Divider>
              <Card.Group className='schedCards' centered>
                {this.props.events.map((event, index) => <Event key={index} event={event}/>)}
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
  const today = new Date();
  today.setHours(today.getHours() - 10);
  const subscription = Meteor.subscribe('Events');
  return {
    events: Events.find({
      date: { $gte: today },
    }, { sort: { date: 1 } }).fetch(),
    events2: Events.find({
      date: { $lt: today },
    }, { sort: { date: -1 } }).fetch(),
    ready: subscription.ready(),
  };
})(Schedule);

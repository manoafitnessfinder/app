import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Loader, Segment, Divider, Header, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import {
  AutoForm, ErrorsField, HiddenField, SelectField, SubmitField,
  TextField, LongTextField,
} from 'uniforms-semantic';
import PropTypes from 'prop-types';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import Event from '/imports/ui/components/Event';
import { Events } from '../../api/event/Events';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class Schedule extends React.Component {
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Grid container>
          <Divider hidden/>
          <Grid.Row>
            <Grid.Column width={4}>
              <Segment fixed inverted className='scheduleBar'>
                <Header as='h3' textAlign='center'>SCHEDULE A NEW EVENT</Header>
                THIS WILL BE AN AUTOFORM.<br/>
                <b>DATE</b><br/>
                <b>TIME</b><br/>
                <b>EVENT TYPE</b> (MULTISELECT - a choice of run, lift, hike, etc.<br/>
                <b>LOCATION</b> (type in)<br/>
                <b>ASSOCIATED USER</b> (MULTISELECT - dropdown to choose from friends list<br/>
                <b>NOTES</b> (long text field)
              </Segment>
            </Grid.Column>
            <Grid.Column width={12}>
              <Header as='h1' textAlign='center'>Upcoming Events</Header>
              <Card.Group>
                {this.props.events.map((event, index) => <Event
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
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  const subscription = Meteor.subscribe('Events');
  return {
    events: Events.find({}).fetch(),
    ready: subscription.ready(),
  };
})(Schedule);

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Loader, Segment, Divider, Header, Card, Icon } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import {
  AutoForm, ErrorsField, HiddenField, SelectField, SubmitField,
  TextField, LongTextField,
} from 'uniforms-semantic';
import PropTypes from 'prop-types';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import { Profiles, ProfileSchema } from '../../api/profile/Profile';


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
                <Header as='h2' textAlign='center' >Schedule a New Event</Header>
                <AutoForm schema={ProfileSchema} onSubmit={data => this.submit(data)} model={this.props.doc}>
                  <TextField name='name' label='event type'/>
                  <TextField name='image' label='date'/>
                  <TextField name='description' label='time'/>
                </AutoForm>
              </Segment>
            </Grid.Column>
            <Grid.Column width={12}>
              <Header as='h1' textAlign='center'>Upcoming Events</Header>
              <Card centered>
                <Card.Content header='TUESDAY, APRIL 21 @ 3:30 PM' textAlign='center' />
                <Card.Content>
                  <Icon name='car' /> Run<br/>
                  <Icon name='user' /> john@foo.com<br/>
                  <Icon name='map' /> Makakilo
                </Card.Content>
                <Card.Content extra textAlign='right'>
                  <Icon name='edit'/> Edit<br/>
                  <Icon name='trash'/> Delete
                </Card.Content>
              </Card>

              <Header as='h1' textAlign='center'>Past Events</Header>
              <Card.Group centered>
                <Card>
                <Card.Content header='TUESDAY, APRIL 21 @ 3:30 PM' textAlign='center' />
                <Card.Content>
                  <Icon name='car' /> Run<br/>
                  <Icon name='user' /> john@foo.com<br/>
                  <Icon name='map' /> Makakilo
                </Card.Content>
                <Card.Content>
                  It was fun!
                </Card.Content>
                <Card.Content extra textAlign='right'>
                  <Icon name='edit'/> Edit this event
                </Card.Content>
                </Card>
                <Card>
                <Card.Content header='TUESDAY, APRIL 21 @ 3:30 PM' textAlign='center' />
                <Card.Content>
                  <Icon name='car' /> Run<br/>
                  <Icon name='user' /> john@foo.com<br/>
                  <Icon name='map' /> Makakilo
                </Card.Content>
                <Card.Content>
                  It was fun!
                </Card.Content>
                <Card.Content extra textAlign='right'>
                  <Icon name='edit'/> Edit this event
                </Card.Content>
              </Card>
                <Card>
                  <Card.Content header='TUESDAY, APRIL 21 @ 3:30 PM' textAlign='center' />
                  <Card.Content>
                    <Icon name='car' /> Run<br/>
                    <Icon name='user' /> john@foo.com<br/>
                    <Icon name='map' /> Makakilo
                  </Card.Content>
                  <Card.Content>
                    <Icon name='clock'/>8:15<br/>
                    Had a difficult run.
                  </Card.Content>
                  <Card.Content extra textAlign='right'>
                    <Icon name='edit'/> Edit this event
                  </Card.Content>
                </Card>
              </Card.Group>
            </Grid.Column>
          </Grid.Row>
          <Divider hidden/>
    </Grid>
  )
    ;
  }
}

Schedule.propTypes = {
  profiles: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  const subscription = Meteor.subscribe('Profiles');
  return {
    profiles: Profiles.find({}).fetch(),
    ready: subscription.ready(),
  };
})(Schedule);

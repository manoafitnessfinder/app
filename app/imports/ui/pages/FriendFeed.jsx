import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Divider, Header, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import FriendEvent from '/imports/ui/components/FriendEvent';
import { Events } from '../../api/event/Events';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class FriendFeed extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Divider hidden/>
          <Header as='h1' textAlign='center'>Friend Feed</Header>
          <Divider hidden/>

          <Divider horizontal>
            <Header as='h2'>Upcoming Events</Header>
          </Divider>

          <Card.Group centered className='upFeed'>
            {this.props.events.map((event, index) => <FriendEvent
                key={index}
                event={event}
            />)
            }
          </Card.Group>
          <Divider hidden/>
          <Divider hidden/>

          <Divider horizontal>
            <Header as='h2'>Past Events</Header>
          </Divider>


          <Card.Group className='pastFeed' centered>
            {this.props.events2.map((event, index) => <FriendEvent
                key={index}
                event={event}
            />)
            }
          </Card.Group>
          <Divider hidden/>
        </Container>

    );
  }
}

FriendFeed.propTypes = {
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
})(FriendFeed);

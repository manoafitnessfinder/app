import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import { Container, Image, Card, Button, Grid, Icon, Divider, Header, Reveal, List } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Events } from '../../api/event/Events';
import Event from '/imports/ui/components/Event';

/** A simple static component to render some text for the landing page. */
class UserLanding extends React.Component {
  render() {
    return (
        <div className="aboutBackground">
          <Container>
            <Container id='user_landing_top'>
              <Button as={Link} to="/profile" animated className="whtBtn" size="huge" centered>
                <Button.Content visible>Edit Profile</Button.Content>
                <Button.Content hidden>
                  <Icon name='arrow right'/>
                </Button.Content>
              </Button>
            </Container>
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
            <Container id='user_landing_middle'>
              <Button as={Link} to="/allprofiles" animated className="whtBtn" size="huge" centered>
                <Button.Content visible>Find Friends</Button.Content>
                <Button.Content hidden>
                  <Icon name='arrow right'/>
                </Button.Content>
              </Button>
            </Container>
            <Divider hidden/>
            <Grid>
              <Grid.Row>
                <Grid.Column width={8} textAlign='center'>
                  <Reveal animated='move left' instant>
                    <Reveal.Content visible>
                      <Image fluid src="/images/UserLanding3.PNG"/>
                    </Reveal.Content>
                    <Reveal.Content hidden><br/><br/><br/><br/>
                      <Header as='h1'>Schedule A New Event</Header>
                      <Header as='h3'>4 Easy Steps!</Header>
                      <br/>
                      <Grid.Row>
                        <List as='h3' size='large'>
                          <List.Item>
                            <Icon name='calendar'/> Set date and time
                          </List.Item>
                          <br/>
                          <List.Item>
                            <Icon name='thumbtack'/> Set event type
                          </List.Item>
                          <br/>
                          <List.Item>
                            <Icon name='location arrow'/> Set location
                          </List.Item>
                          <br/>
                          <List.Item>
                            <Icon name='sticky note'/> Add notes
                          </List.Item>
                          <br/>
                        </List>
                      </Grid.Row>
                      <Button className='grnBtn' as={Link} to="/events" animated size="large">
                        <Button.Content visible>Get Started</Button.Content>
                        <Button.Content hidden>
                          <Icon className='iWht' name='arrow right'/>
                        </Button.Content>
                      </Button>
                    </Reveal.Content>
                  </Reveal>
                </Grid.Column>
                <Grid.Column textAlign='center' width={8}>
                  <Reveal animated='move right' instant>
                    <Reveal.Content visible>
                      <Image src="/images/UserLanding4.PNG" fluid/>
                    </Reveal.Content>
                    <Reveal.Content hidden>
                      <br/><br/><br/><br/><br/>
                      <Header as='h1'>Keep up with your friends</Header>
                      <Divider hidden/>
                      <Header as='h3'>View past events your friends accomplished and join new ones that are coming
                      up.</Header>
                      <Header as='h3'>Let`&apos;`s lose that freshman 15 together!</Header>
                      <Button className='grnBtn' as={Link} to="/friendevents" animated size="large">
                        <Button.Content visible>View Now</Button.Content>
                        <Button.Content hidden>
                          <Icon className='iWht' name='arrow right'/>
                        </Button.Content>
                      </Button>
                    </Reveal.Content>
                  </Reveal>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </div>
    );
  }
}

UserLanding.propTypes = {
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
    }, { sort: { date: 1 }, limit: 4 }).fetch(),
    events2: Events.find({
      date: { $lt: today },
    }, { sort: { date: -1 }, limit: 4 }).fetch(),
    ready: subscription.ready(),
  };
})(UserLanding);

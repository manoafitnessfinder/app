import React from 'react';
import { Link } from 'react-router-dom';
import { Divider, Grid, Image, Container, Header, Segment, Button, Reveal, Icon, List } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        /* Outside to maintain consistent borders. */
        <Container className = 'landingPage'>
          <Container verticalAlign='middle' textAlign='center'>
            <Image className="landing" fluid src='/images/Landing1.PNG'/>
          </Container>
          <Header className = 'landingPage' textAlign='centered' as={'h1'}>
            Follow 5 Simple Steps to reach your Fitness Goals!</Header>
          <Grid verticalAlign='middle'>
            <Grid.Row columns={3}>
              <Grid.Column verticalAlign='middle'>
                <Reveal animated='move left' instant>
                  <Reveal.Content visible>
                    <Image fluid src='/images/Landing2.jpg'/>
                  </Reveal.Content>
                  <Reveal.Content hidden verticalAlign='middle'>
                    <br/>
                    <Header className = 'landingPage' textAlign='centered' as={'h1'}>
                      Schedule an event with a friend today!
                      <Divider hidden/>
                      <Button className='grnBtn' as={Link} to="/signup" animated size="large">
                        <Button.Content visible>Create a Workout</Button.Content>
                        <Button.Content hidden>
                          <Icon className='iWht' name='arrow right'/>
                        </Button.Content>
                      </Button>
                    </Header>
                  </Reveal.Content>
                </Reveal>
              </Grid.Column>
              <Grid.Column textAlign='center'>
                <List as='h2' size='large'>
                  <List.Item>
                    <Icon name='user' /> Create an account
                  </List.Item>
                  <br/>
                  <List.Item>
                    <Icon name='edit' /> Edit your profile
                  </List.Item>
                  <br/>
                  <List.Item>
                    <Icon name='search' /> Find Fitness Friends
                  </List.Item>
                  <br/>
                  <List.Item>
                    <Icon name='calendar' /> Schedule new workouts
                  </List.Item>
                  <br/>
                  <List.Item>
                    <Icon name='feed' /> See & join friends' events
                  </List.Item>
                </List>
              </Grid.Column>
              <Grid.Column>
                <Reveal animated='move right' instant>
                  <Reveal.Content visible>
                    <Image fluid src='/images/Landing3.jpg'/>
                  </Reveal.Content>
                  <Reveal.Content hidden>
                    <br/>
                    <Header className = 'landingPage' textAlign='centered' as={'h1'}>
                      Get started right away to avoid the freshman fifteen!
                    </Header>
                  </Reveal.Content>
                </Reveal>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Header className = 'landingPage' textAlign='centered' as={'h1'}>
           Work toward a better you. </Header>
          <Container className='landing_bottom_image'>
            <Segment basic floated='right' compact textAlign='center'>
              <Button className='scheduleButton' as={Link} to="/signup" animated size="large">
                <Button.Content visible>JOIN NOW</Button.Content>
                <Button.Content hidden>
                  <Icon name='arrow right'/>
                </Button.Content>
              </Button>
            </Segment>
          </Container>
        </Container>
    );
  }
}

export default Landing;

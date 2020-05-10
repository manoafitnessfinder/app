import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Image, Container, Header, Segment, Button, Reveal, Icon, List } from 'semantic-ui-react';

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
            5 Simple Steps to your Fitness Goals!</Header>
          <Grid>
            <Grid.Row columns={3}>
              <Grid.Column>
                <Reveal animated='move left' instant>
                  <Reveal.Content visible>
                    <Image fluid src='/images/Landing2.jpg'/>
                  </Reveal.Content>
                  <Reveal.Content hidden>
                    <br/>
                    <Header className = 'landingPage' textAlign='centered' as={'h1'}>
                      Schedule an event with a friend today!<br/>
                      <Button as={Link} to="/signup" animated size="large">
                        <Button.Content visible>Start Your Workout</Button.Content>
                        <Button.Content hidden>
                          <Icon name='arrow right'/>
                        </Button.Content>
                      </Button>
                    </Header>
                  </Reveal.Content>
                </Reveal>
              </Grid.Column>
              <Grid.Column textAlign='center'>
                <br/>
                <List as='h2' size='large'>
                  <List.Item>
                    <Icon name='user' />
                    Create an account
                  </List.Item>
                  <br/>
                  <List.Item>
                    <Icon name='edit' />
                    Edit user profile
                  </List.Item>
                  <br/>
                  <List.Item>
                    <Icon name='search' />
                    Find Fitness Friends
                  </List.Item>
                  <br/>
                  <List.Item>
                    <Icon name='calendar' />
                    Create schedule workouts
                  </List.Item>
                  <br/>
                  <List.Item>
                    <Icon name='feed' />
                    Track your friends events
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
                      The Freshmen Fifteen could happen to you, get started today.
                    </Header>
                  </Reveal.Content>
                </Reveal>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Header className = 'landingPage' textAlign='centered' as={'h1'}>
            Work towards your better self!</Header>
          <Container className='landing_bottom_image'>
            <Segment basic floated='right' compact textAlign='center'>
              <Button as={Link} to="/signup" animated className="JoinButton" size="large">
                <Button.Content visible>Join Now</Button.Content>
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

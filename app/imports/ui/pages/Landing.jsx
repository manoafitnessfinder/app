import React from 'react';
import { Link } from 'react-router-dom';
import { Divider, Grid, Image, Container, Header, Segment, Button, Reveal, Icon, List } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        /* Outside to maintain consistent borders. */
        <Container className='landingPage'>
          <Container verticalalign='middle' textAlign='center'>
            <Image className="landing" fluid src='/images/Landing1.PNG'/>
          </Container>
          <Header className='landingPage' textAlign='center' as={'h1'}>
            Follow 5 Simple Steps to reach your Fitness Goals!</Header>
          <Grid verticalalign='middle'>
            <Grid.Row columns={3}>
              <Grid.Column verticalalign='middle'>
                <Reveal animated='move' instant>
                  <Reveal.Content visible>
                    <Image fluid src='/images/Landing2.jpg'/>
                  </Reveal.Content>
                  <Reveal.Content hidden verticalalign='middle'>
                    <br/>
                    <br/>
                    <br/>
                    <Header className='landingPage' textAlign='center' as={'h1'}>
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
                  <br/><br/><br/>
                  <List.Item>
                    <Icon name='user'/> Create an account
                  </List.Item>
                  <br/>
                  <List.Item>
                    <Icon name='edit'/> Edit your profile
                  </List.Item>
                  <br/>
                  <List.Item>
                    <Icon name='search'/> Find Fitness Friends
                  </List.Item>
                  <br/>
                  <List.Item>
                    <Icon name='calendar'/> Schedule new workouts
                  </List.Item>
                  <br/>
                  <List.Item>
                    <Icon name='feed'/> See & join friends`&apos;` events
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
                    <br/>
                    <br/>
                    <br/>
                    <Header className='landingPage' textAlign='center' as={'h1'}>
                      Get started right away to avoid the freshman fifteen!
                    </Header>
                  </Reveal.Content>
                </Reveal>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Header className='landingPage' textAlign='center' as={'h1'}>
            Work toward a better you. </Header>
          <Container className='landing_bottom_image'>
            <Segment basic floated='right' compact textAlign='center'>
              <Button className='whtBtn' as={Link} to="/signup" animated size="large">
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

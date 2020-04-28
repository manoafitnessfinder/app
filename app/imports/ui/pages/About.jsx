import React from 'react';
import { Container, Image, Grid, Header, Form, Button, Input, List, Icon } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class About extends React.Component {
  render() {
    return (
        <div className="aboutBackground">
        <Container>
          <Image centered src="/images/topImage4.JPG" fluid/>
          <Grid padded>
            <Grid.Row>
              <Grid.Column textAlign='center' width={8}>
                <Header size='huge' style={{ color: '#6D9B7C' }}>
                  How Fitness Finder Works
                </Header>
                <Grid.Row>
                  <List size='huge'>
                    <List.Item>
                    <Icon name='user' />
                    Sign-up and create an account
                  </List.Item>
                    <List.Item>
                      <Icon name='edit' />
                      Edit user profile
                    </List.Item>
                    <List.Item>
                      <Icon name='add user' />
                      Match with users with similar intrests
                    </List.Item>
                    <List.Item>
                      <Icon name='search' />
                      Search for the perfect gym buddy
                    </List.Item>
                    <List.Item>
                      <Icon name='calendar' />
                      Create schedule workouts
                    </List.Item>
                    <List.Item>
                      <Icon name='feed' />
                      Track your progress and other workouts events
                    </List.Item>
                  </List>
                </Grid.Row>
              </Grid.Column>
              <Grid.Column width={8}>
              <Image src="/images/about1.png" fluid/>
            </Grid.Column>
            </Grid.Row>
          <Grid.Row>
            <Grid.Column width={8}>
              <Image src="/images/about2.jpg" fluid/>
            </Grid.Column>
            <Grid.Column textAlign='center' width={8}>
              <Header size='huge' style={{ color: '#6D9B7C' }}>
                Who Are We
              </Header>
              <Header size='large'>
                Fitness Finder is an app that helps students find their workout buddy to lose the freshman fifteen. We
                match you with users who have similar fitness intrests and you can connect to set up a workout session
              </Header>
            </Grid.Column>
          </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign='center' width={8}>
                <Header size='huge' style={{ color: '#6D9B7C' }}>
                  Why We Matter
                </Header>
                <Header size='large'>
                  You no longer have to workout alone! Fitness Finder  allows you to feel empowered while you make those
                  fitness connections!
                </Header>
              </Grid.Column>
              <Grid.Column width={8}>
                <Image src="/images/about3.png" fluid/>
              </Grid.Column>
            </Grid.Row>
            <div className="joinNow">
              <Grid container verticalAlign="center">
                <Header inverted as='h2'>
                  Join the Hunt!
                  <Header.Subheader>
                  Sign-Up and start matching with members today!
                  </Header.Subheader>
                </Header>
                <Grid.Row>
                  <Form>
                    <Form.Group widths='equal'>
                      <Form.Field
                          id='form-input-control-first-name'
                          control={Input}
                          placeholder='First name'
                      />
                      <Form.Field
                          id='form-input-control-last-name'
                          control={Input}
                          placeholder='Last name'
                      />
                    </Form.Group>
                    <Form.Field
                        id='form-input-control-error-email'
                        control={Input}
                        placeholder='Please enter email address'
                    />
                    <Form.Field
                        id='form-button-control-public'
                        control={Button}
                        content='Confirm'
                    />
                  </Form>
                </Grid.Row>
              </Grid>
            </div>
          </Grid>
        </Container>
        </div>
    );
  }
}

export default About;

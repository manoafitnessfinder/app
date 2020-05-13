import React from 'react';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';
import { withTracker } from 'meteor/react-meteor-data';
import { Redirect } from 'react-router-dom';
import { Container, Image, Grid, Header, Form, List, Icon, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';
import { Profiles } from '../../api/profile/Profile';

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
class About extends React.Component {
  /** Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '', redirectToReferer: false };
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  /** Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  submit = () => {
    const { name, email, password } = this.state;
    const owner = this.state.email;
    Accounts.createUser({ email, username: email, password }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      }
    });
    const interests = ['Walking'];
    const age = 18;
    const image = '';
    const description = '';
    const gender = 'Undefined';
    const seeking = 'No Preference';
    const level = 'Beginner';
    Profiles.insert({ name, interests, age, image, description, gender, seeking, level, owner }, err => {
      if (err) {
        swal('Error', err.message, 'error');
      } else {
        this.setState({ error: '', redirectToReferer: true });
      }
    });
  }

  /** Display the signup form. Redirect to add page after successful registration and login. */
  render() {
    const { from } = this.props.location.state || { from: { pathname: /profile/ } };
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    return (
          <Container>
            <Image centered src="/images/About1.PNG" fluid/>
            <Grid>
              <Grid.Row>
                <Grid.Column textAlign='center' width={8}>
        <Container>
          <Image centered src="/images/About1.PNG" fluid/>
          <Grid>
            <Grid.Row>
              <Grid.Column textAlign='center' width={8}>
                <br/>
                <Header as='h3' size='huge' style={{ color: '#6D9B7C' }}>
                  How Fitness Finder Works
                </Header>
                <Grid.Row>
                  <br/>
                  <Header as='h3' size='huge' style={{ color: '#6D9B7C' }}>
                    How Fitness Finder Works
                  </Header>
                  <Grid.Row>
                    <br/>
                    <List as='h2' size='large'>
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
                  </Grid.Row>
                </Grid.Column>
                <Grid.Column width={8}>
                  <br/>
                  <Image src="/images/About2.jpeg" fluid/>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={8}>
                  <Image src="/images/About3.jpg" fluid/>
                </Grid.Column>
                <Grid.Column textAlign='center' width={8}>
                  <br/>
                  <Header as='h3' size='huge' style={{ color: '#6D9B7C' }}>
                    Who we are
                  </Header>
                  <Header as='h4' size='large'>
                    Manoa Fitness Finder helps students find a workout buddy to get healthy and active. MFF makes it
                    easy to find others
                    with similar fitness goals and connect to schedule events together.
                  </Header>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column textAlign='center' width={8}>
                  <br/>
                  <Header as='h3' size='huge' style={{ color: '#6D9B7C' }}>
                    Why We Matter
                  </Header>
                  <Header as='h4' size='large'>
                    You no longer have to worry about going to the gym without a spotter or going on a run alone! Manoa
                    Fitness Finder allows you to make fitness connections with others with similar interests.
                  </Header>
                </Grid.Column>
                <Grid.Column width={8}>
                  <Image src="/images/About4.jpg" fluid/>
                </Grid.Column>
              </Grid.Row>
              <div className="joinNow">
                <Grid container verticalAlign='middle' textAlign='center'>
                  <Header inverted as='h2'>
                    Join the Hunt!
                    <Header.Subheader>
                      Sign up and start matching with members today!
                    </Header.Subheader>
                  </Header>
                  <Grid.Row>
                    <Form onSubmit={this.submit}>
                      <Container>
                        <Form.Group as='h3' widths='equal'>
                          <Form.Input fluid label='NAME'
                                      name="name"
                                      type="name"
                                      placeholder='Your name here.'
                                      onChange={this.handleChange}
                          />
                        </Form.Group>
                        <Form.Group as='h3' widths='equal'>
                          <Form.Input fluid
                                      label="EMAIL"
                                      name="email"
                                      type="email"
                                      placeholder="UH E-mail address"
                                      onChange={this.handleChange}
                          />
                          <Form.Input
                              label="PASSWORD"
                              name="password"
                              type="password"
                              placeholder="Password"
                              onChange={this.handleChange}
                          />
                        </Form.Group>
                        <Form.Field align='center'>
                          <Form.Button content="Set Up Profile"/>
                        </Form.Field>
                      </Container>
                    </Form>
                    {this.state.error === '' ? (
                        ''
                    ) : (
                        <Message
                            error
                            header="There was an error is your registration. Try again or contact us."
                            content={this.state.error}
                        />
                    )}
                  </Grid.Row>
                </Grid>
              </div>
            </Grid>
          </Container>
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
                </Grid.Row>
              </Grid.Column>
              <Grid.Column width={8}>
                <br/>
              <Image src="/images/About2.jpeg" fluid/>
            </Grid.Column>
            </Grid.Row>
          <Grid.Row>
            <Grid.Column width={8}>
              <Image src="/images/About3.jpg" fluid/>
            </Grid.Column>
            <Grid.Column textAlign='center' width={8}>
              <br/>
              <Header as='h3' size='huge' style={{ color: '#6D9B7C' }}>
                Who we are
              </Header>
              <Header as='h4' size='large'>
                Manoa Fitness Finder helps students find a workout buddy to get healthy and active. MFF makes it easy to find others
                with similar fitness goals and connect to schedule events together.
              </Header>
            </Grid.Column>
          </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign='center' width={8}>
                <br/>
                <Header as='h3' size='huge' style={{ color: '#6D9B7C' }}>
                  Why We Matter
                </Header>
                <Header as='h4' size='large'>
                  You no longer have to worry about going to the gym without a spotter or going on a run alone! Manoa
                  Fitness Finder allows you to make fitness connections with others with similar interests.
                </Header>
              </Grid.Column>
              <Grid.Column width={8}>
                <Image src="/images/About4.jpg" fluid/>
              </Grid.Column>
            </Grid.Row>
            <div className="joinNow">
              <Grid container verticalAlign="center">
                <Header inverted as='h2'>
                  Join the Hunt!
                  <Header.Subheader>
                  Sign up and start matching with members today!
                  </Header.Subheader>
                </Header>
                <Grid.Row>
                  <Form onSubmit={this.submit}>
                    <Container>
                    <Form.Group as='h3' widths='equal'>
                      <Form.Input fluid label='NAME'
                                  name="name"
                                  type="name"
                                  placeholder='Your name here.'
                                  onChange={this.handleChange}
                      />
                    </Form.Group>
                    <Form.Group as='h3' widths='equal'>
                      <Form.Input fluid
                                  label="EMAIL"
                                  name="email"
                                  type="email"
                                  placeholder="UH E-mail address"
                                  onChange={this.handleChange}
                      />
                      <Form.Input
                          label="PASSWORD"
                          name="password"
                          type="password"
                          placeholder="Password"
                          onChange={this.handleChange}
                      />
                    </Form.Group>
                    <Form.Field align='center'>
                      <Form.Button content="Set Up Profile"/>
                    </Form.Field>
                    </Container>
                  </Form>
                  {this.state.error === '' ? (
                      ''
                  ) : (
                      <Message
                          error
                          header="There was an error is your registration. Try again or contact us."
                          content={this.state.error}
                      />
                  )}
                </Grid.Row>
              </Grid>
            </div>
          </Grid>
        </Container>
    );
  }
}

/** Ensure that the React Router location object is available in case we need to redirect. */
About.propTypes = {
  profiles: PropTypes.array.isRequired,
  location: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  const subscription = Meteor.subscribe('Profiles');
  return {
    profiles: Profiles.find({}).fetch(),
    ready: subscription.ready(),
  };
})(About);

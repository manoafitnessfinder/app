import React from 'react';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';
import { withTracker } from 'meteor/react-meteor-data';
import { Redirect } from 'react-router-dom';
import { Container, Image, Grid, Header, Form, List, Icon, Checkbox, Message } from 'semantic-ui-react';
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
        <div className="aboutBackground">
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
                  <List as='h2' size='huge'>
                    <List.Item>
                    <Icon name='user' />
                    Sign-up and create an account
                  </List.Item>
                    <List.Item>
                      <Icon name='edit' />
                      Edit user profile
                    </List.Item>
                    <List.Item>
                      <Icon name='search' />
                      Search for the perfect gym buddy
                    </List.Item>
                    <List.Item>
                      <Icon name='add user' />
                      Add Friends to your workouts
                    </List.Item>
                    <List.Item>
                      <Icon name='calendar' />
                      Create schedule workouts
                    </List.Item>
                    <List.Item>
                      <Icon name='feed' />
                      Track your friends events
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
                Who Are We
              </Header>
              <Header as='h2' size='large'>
                Fitness Finder is an app that helps students find their workout buddy to lose the freshman fifteen. You
                are able to find students with similar fitness goals and connect to set up a workout session
              </Header>
            </Grid.Column>
          </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign='center' width={8}>
                <br/>
                <Header as='h3' size='huge' style={{ color: '#6D9B7C' }}>
                  Why We Matter
                </Header>
                <Header as='h2' size='large'>
                  You no longer have to workout alone! Fitness Finder  allows you to feel empowered while you make those
                  fitness connections!
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
                  Sign-Up and start matching with members today!
                  </Header.Subheader>
                </Header>
                <Grid.Row>
                  <Form onSubmit={this.submit}>
                    <Container>
                    <Form.Group as='h2' widths='equal'>
                      <Form.Input fluid label='NAME'
                                  name="name"
                                  type="name"
                                  placeholder='Your name here.'
                                  onChange={this.handleChange}
                      />
                    </Form.Group>
                    <Form.Group as='h2' widths='equal'>
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
                    <Form.Field as='h2' align='center'>
                      <Checkbox label='I agree to the Terms and Conditions'/>
                    </Form.Field>
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
        </div>
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

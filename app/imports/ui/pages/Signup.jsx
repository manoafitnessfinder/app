import React from 'react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Redirect } from 'react-router-dom';
import { Container, Form, Grid, Header, Image, Message, Checkbox } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';
import { Profiles } from '../../api/profile/Profile';

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
class Signup extends React.Component {
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
    const signupStyle = { padding: '10px' };
    return (
        <Container>
          <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
            <Grid.Column>
              <Image style={signupStyle} size='huge' centered src="/images/signup.jpg"/>
              <Header as="h3" textAlign="center">
                Sign-up and start connecting with other Manoa students today!
              </Header>
              <Form onSubmit={this.submit}>
                <Container>
                  <Form.Group widths='equal'>
                    <Form.Input fluid label='Name'
                                name="name"
                                type="name"
                                placeholder='Your name here.'
                                onChange={this.handleChange}
                    />
                  </Form.Group>
                  <Form.Group widths='equal'>
                    <Form.Input fluid
                                label="Email"
                                name="email"
                                type="email"
                                placeholder="UH E-mail address"
                                onChange={this.handleChange}
                    />
                    <Form.Input
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={this.handleChange}
                    />
                  </Form.Group>
                  <Form.Field align='center'>
                    <Checkbox label='I agree to the Terms and Conditions'/>
                  </Form.Field>
                  <Form.Field align='center'>
                    <Form.Button basic color='green' content="Set Up Profile"/>
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
            </Grid.Column>
          </Grid>
        </Container>
    );
  }
}

/** Ensure that the React Router location object is available in case we need to redirect. */
Signup.propTypes = {
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
})(Signup);

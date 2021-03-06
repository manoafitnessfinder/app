import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Container, Form, Grid, Header, Message, Divider, Image, Button } from 'semantic-ui-react';

/**
 * Signin page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
export default class Signin extends React.Component {

  /** Initialize component state with properties for login and redirection. */
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '', redirectToReferer: false };
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  /** Handle Signin submission using Meteor's account mechanism. */
  submit = () => {
    const { email, password } = this.state;
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '', redirectToReferer: true });
      }
    });
  }

  /** Render the signin form. */
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/userlanding' } };
    // if correct authentication, redirect to page instead of login screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    // Otherwise return the Login form.
    return (
        <Container>
          <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
            <Grid.Column>
              <Image src="/images/SignIn.JPG"/>
            </Grid.Column>
            <Divider hidden vertical/>
            <Grid.Column>
              <Header as="h2" textAlign="center">
                Login to connect now!
              </Header>
              <Form onSubmit={this.submit}>
                <Container attached>
                  <Form.Input
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="Enter E-mail address"
                      onChange={this.handleChange}
                  />
                  <Form.Input
                      label="Password"
                      name="password"
                      placeholder="Enter Password"
                      type="password"
                      onChange={this.handleChange}
                  />
                  <Form.Button basic color='green' content="Submit" fluid/>
                  <Link to="/signup">
                    <Button basic color='green' attached content="Don't have an account? Sign up now!" />
                  </Link>
                </Container>
              </Form>
              {this.state.error === '' ? (
                  ''
              ) : (
                  <Message
                      error
                      header="Login was not successful"
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
Signin.propTypes = {
  location: PropTypes.object,
};

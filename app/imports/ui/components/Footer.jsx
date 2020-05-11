import React from 'react';
import { Grid, Menu, Divider } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Header } from 'semantic-ui-react'

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { paddingTop: '15px' };
    return (
        <footer>
          <Grid style={divStyle} centered stackable columns='3' container>
            <Grid.Column>
              <Header as='h3' inverted>About Us</Header>
              <hr/>
              <p>
                <a href="https://github.com/manoafitnessfinder/app/">Our github page</a>
              </p>
              <p>
                <a href="https://manoafitnessfinder.github.io/">Github.io page</a>
              </p>
              <p>
                <a href="https://manoafitnessfinder.github.io/#team-members">Meet the team</a>
              </p>
            </Grid.Column>
            <Grid.Column>
              <Header as='h3' inverted>Sitemap</Header>
              <hr/>
              <p>
                <Menu.Item
                    as={NavLink}
                    activeClassName=""
                    exact to="/contact"
                    key="contact">Contact Us
                </Menu.Item>
              </p>
              <p>
                <Menu.Item
                    as={NavLink}
                    activeClassName="active"
                    exact to="/AllProfiles"
                    key='AllProfiles'>All Profiles
                </Menu.Item>
              </p>
              <p>
                <Menu.Item
                    as={NavLink}
                    activeClassName="active"
                    exact to="/friends"
                    key='friends'>Friends List
                </Menu.Item>
              </p>
            </Grid.Column>
            { this.props.currentUser === '' ? (
                <Grid.Column>
                  <Header as='h3' inverted>
                    { /* Later possibility to add an email box here to autofill
                the signup page box from the user entered text */}
                    <Menu.Item textalign='left'
                               as={NavLink}
                               activeClassName="active"
                               exact to="/signup"
                               key='signup'>Create your account today!</Menu.Item></Header>
                  <hr/>
                  <p>With all the workout and social possibilities, why wait? Create an account with Manoa Fitness
                    Finder
                    today!</p>
                </Grid.Column>
            ) : ''}
          </Grid>
        </footer>
    );
  }
}

/** Declare the types of all properties. */
Footer.propTypes = {
  currentUser: PropTypes.string,
};

export default Footer;

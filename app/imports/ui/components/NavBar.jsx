import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Grid } from 'semantic-ui-react';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    return (
        <Grid centered>
          <Grid.Row>
            <Menu attached="top" borderless className="topmenu">
              <Menu.Item as={NavLink} activeClassName="" exact to="/landing" key='landing'>Home</Menu.Item>
              {this.props.currentUser ? (
                  [<Menu.Item as={NavLink} activeClassName="active" exact to="/allprofiles" key='allprofiles'>All
                    Profiles</Menu.Item>,
                    <Menu.Item as={NavLink} activeClassName="active" exact to="/friends" key='friends'>Friends
                      List</Menu.Item>,
                    <Menu.Item as={NavLink} activeClassName="active" exact to="/schedule"
                               key='schedule'>Schedule</Menu.Item>,
                    <Menu.Item as={NavLink} activeClassName="active" exact to="/profile"
                               key='profile'>Profile</Menu.Item>]
              ) : ''}
              <Menu.Item as={NavLink} activeClassName="" exact to="/about" key='about'>About Us</Menu.Item>
              <Menu.Item as={NavLink} activeClassName="" exact to="/test" key="testimonial">Testimonials</Menu.Item>
              <Menu.Item as={NavLink} activeClassName="" exact to="/contact" key="contact">Contact Us</Menu.Item>
              <Menu.Item position="right">
                {this.props.currentUser === '' ? (
                    <Dropdown pointing="top right" icon={'user'}>
                      <Dropdown.Menu>
                        <Dropdown.Item icon="user" text="Sign In" as={NavLink} exact to="/signin"/>
                        <Dropdown.Item icon="add user" text="Sign Up" as={NavLink} exact to="/signup"/>
                      </Dropdown.Menu>
                    </Dropdown>
                ) : (
                    <Dropdown text={this.props.currentUser} pointing="top right" icon={'user'}>
                      <Dropdown.Menu>
                        <Dropdown.Item icon="sign out" text="Sign Out" as={NavLink} exact to="/signout"/>
                        <Dropdown.Item icon="user" text="Profile Page" as={NavLink} exact to="/profile"/>
                        <Dropdown.Item icon="user" text="Edit Profile Page" as={NavLink} exact to="/editprofile/:_id"/>
                      </Dropdown.Menu>
                    </Dropdown>
                )}
              </Menu.Item>
            </Menu>
          </Grid.Row>
        </Grid>
    );
  }
}

/** Declare the types of all properties. */
NavBar.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(NavBarContainer);

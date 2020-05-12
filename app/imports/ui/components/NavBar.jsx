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
        <Grid centered container>
          <Grid.Row>
            <Menu attached="top" borderless className="topmenu">
              {this.props.currentUser === '' ? (
                  [<Menu.Item as={NavLink} activeClassName="" exact to="/landing"
                              key='landing'><h4>Home</h4></Menu.Item>,
                    <Menu.Item as={NavLink} activeClassName="" exact to="/about" key='about'><h4>About
                        Us</h4></Menu.Item>,
                    <Menu.Item as={NavLink} activeClassName="" exact to="/test"
                               key="testimonial"><h4>Testimonials</h4></Menu.Item>,
                    <Menu.Item as={NavLink} activeClassName="" exact to="/contact" key="contact"><h4>Contact
                        Us</h4></Menu.Item>]
              ) : (
                  [<Menu.Item as={NavLink} activeClassName="" exact to="/userlanding" key='Userlanding'>
                      <h4>Home</h4></Menu.Item>,
                    <Menu.Item as={NavLink} activeClassName="active" exact to="/allprofiles"
                               key='allprofiles'><h4>All
                        Profiles</h4></Menu.Item>,
                    <Menu.Item as={NavLink} activeClassName="active" exact to="/events"
                               key='events'><h4>My Events</h4></Menu.Item>,
                    <Menu.Item as={NavLink} activeClassName="active" exact to="/friendevents"
                               key='friendevents'><h4>Friend Events</h4></Menu.Item>,
                    <Menu.Item as={NavLink} activeClassName="active" exact to="/friends" key='friends'><h4>Friends
                        List</h4></Menu.Item>,
                    <Menu.Item as={NavLink} activeClassName="active" exact to="/profile"
                               key='profile'><h4>My Profile</h4></Menu.Item>]
              )}

              <Menu.Item position="right">
                {this.props.currentUser === '' ? (
                    <Dropdown pointing="top right" icon={'user'}>
                      <Dropdown.Menu>
                        <Dropdown.Item icon="user" text="Sign In" as={NavLink} exact to="/signin"/>
                        <Dropdown.Item icon="add user" text="Sign Up" as={NavLink} exact to="/signup"/>
                      </Dropdown.Menu>
                    </Dropdown>
                ) : (
                    <Dropdown pointing="top right" icon={'user'} >
                      <Dropdown.Menu>
                        <Dropdown.Item icon="sign out" text="Sign Out" as={NavLink} exact
                                       to="/signout"/>
                        <Dropdown.Item icon="user" text="Profile Page" as={NavLink} exact
                                       to="/profile"/>
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

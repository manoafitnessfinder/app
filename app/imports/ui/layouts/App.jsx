import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import 'semantic-ui-css/semantic.css';
import { Roles } from 'meteor/alanning:roles';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Top from '../components/Top';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import NotFound from '../pages/NotFound';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Signout from '../pages/Signout';
import About from '../pages/About';
import UserProfile from '../pages/UserProfile';
import EditProfile from '../pages/EditProfile';
import EditEvent from '../pages/EditEvent';
import Schedule from '../pages/Schedule';
import AllProfiles from '../pages/AllProfiles';
import User from '../pages/User';
import Friends from '../pages/Friends';
import Testimonials from '../pages/Testimonials';
import Contact from '../pages/Contact';
import UserLanding from '../pages/UserLanding';
import FriendFeed from '../pages/FriendFeed';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
class App extends React.Component {
  render() {
    return (
        <Router>
          <div>
            <Top/>
            <NavBar/>
            <Switch>
              <Route exact path="/" component={Landing}/>
              <Route path="/signin" component={Signin}/>
              <Route path="/signup" component={Signup}/>
              <Route path="/about" component={About}/>
              <Route path="/landing" component={Landing}/>
              <Route path="/test" component={Testimonials}/>
              <Route path="/contact" component={Contact}/>
              <ProtectedRoute path="/userlanding" component={UserLanding}/>
              <ProtectedRoute path="/events" component={Schedule}/>
              <ProtectedRoute path="/profile" component={UserProfile}/>
              <ProtectedRoute path="/allprofiles" component={AllProfiles}/>
              <ProtectedRoute path="/friendevents" component={FriendFeed}/>
              <ProtectedRoute path="/editprofile/:_id" component={EditProfile}/>
              <ProtectedRoute path="/editevent/:_id" component={EditEvent}/>
              <ProtectedRoute path="/user/:_id" component={User}/>
              <ProtectedRoute path="/friends/" component={Friends}/>
              <ProtectedRoute path="/signout" component={Signout}/>
              <Route component={NotFound}/>
            </Switch>
            <Footer/>
          </div>
        </Router>
    );
  }
}

/**
 * ProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      return isLogged ?
          (<Component {...props} />) :
          (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
      );
    }}
  />
);

/**
 * AdminProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
          const isLogged = Meteor.userId() !== null;
          const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
          return (isLogged && isAdmin) ?
              (<Component {...props} />) :
              (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
              );
        }}
    />
);

/** Require a component and location to be passed to each ProtectedRoute. */
ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};

/** Require a component and location to be passed to each AdminProtectedRoute. */
AdminProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};

export default App;

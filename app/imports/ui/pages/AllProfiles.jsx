import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Card, Image } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import AllProfiles from '../components/AllProfiles';
import { Profiles } from '../../api/profile/Profile.js';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListAllProfiles extends React.Component {
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Container className = 'imagePadding'>
            <Image style={ { width: '987px', height: '250px' }} centered src="/images/AllProfiles.PNG"/>
          </Container>
          <Card.Group centered>
            {this.props.profiles.map((testprofile, index) => <AllProfiles key={index} testprofile={testprofile}/>)}
          </Card.Group>
        </Container>
    );
  }
}

ListAllProfiles.propTypes = {
  profiles: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('AllProfiles');
  return {
    profiles: Profiles.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListAllProfiles);

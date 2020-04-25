import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class AllProfiles extends React.Component {
  render() {
    return (
        <Card>
          <Image src={this.props.profile.image} wrapped ui={false} />
          <Card.Content>
            <Card.Header>{this.props.profile.name}</Card.Header>
            <Card.Meta>
              <span className='date'>{this.props.profile.gender} , {this.props.profile.age}</span>
            </Card.Meta>
            <Card.Description>
              {this.props.profile.description.substr(0, 200)} ...
            </Card.Description>
            <Card.Content extra>
              <Link to={`/User/${this.props.profile._id}`}>View Profile</Link>
            </Card.Content>
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
AllProfiles.propTypes = {
  profile: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(AllProfiles);

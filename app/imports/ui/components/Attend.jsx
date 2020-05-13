import React from 'react';
import { Feed } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Attend extends React.Component {
  render() {
    if (this.props.event._id === this.props.attending.eventId) {
      return (
          <Feed.Event>
            <Feed.Content>
              <Feed.Summary>
                {this.props.attending.otherName}
              </Feed.Summary>
            </Feed.Content>
          </Feed.Event>
      );
    }
    return (<h3></h3>);
  }
}

/** Require a document to be passed to this component. */
Attend.propTypes = {
  event: PropTypes.object.isRequired,
  attending: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Attend);

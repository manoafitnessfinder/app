import React from 'react';
import { Feed } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Note extends React.Component {
  render() {
    if (this.props.profile === this.props.note.owner) {
      return (
          <Feed.Event>
            <Feed.Label icon='pencil'/>
            <Feed.Content>
              <Feed.Summary>
                {this.props.note.madeBy}
                <Feed.Date content={this.props.note.createdAt.toLocaleDateString('en-US')}/>
              </Feed.Summary>
              <Feed.Summary>
                {this.props.note.note}
              </Feed.Summary>
            </Feed.Content>
          </Feed.Event>
      );
    }
    return (<h3></h3>);
  }
}

/** Require a document to be passed to this component. */
Note.propTypes = {
  note: PropTypes.object.isRequired,
  profile: PropTypes.string.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Note);

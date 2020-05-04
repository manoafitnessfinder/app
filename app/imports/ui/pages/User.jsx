import React from 'react';
import { Grid, Loader, Header, Divider, Icon, Image, Table, Container, Segment, Feed } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import { Profiles } from '../../api/profile/Profile';
import AddFriend from '../components/AddFriend';
import { Notes } from '../../api/note/Notes';
import AddNote from '../components/AddNote';
import Note from '../components/Note.jsx';

/** Renders the Page for editing a single document. */
class User extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    return (
        <Container>
          <Divider hidden/>
          <Divider hidden/>
          <Segment className='profThing'>
            <Grid>
              <Grid.Column width={13}>
                <Header as="h2" textalign="center">{this.props.doc.name}&apos;s Profile</Header>
              </Grid.Column>
              <Grid.Column width={3} textAlign='right'>
                <AddFriend owner={Meteor.user().username} contactId={this.props.doc._id}
                           friendEmail={this.props.doc.owner}/>
              </Grid.Column>
            </Grid>
          </Segment>
          <Divider hidden/>
          <Divider hidden/>

          <Grid verticalalign='middle'>
            <Grid.Row>
              <Grid.Column width={1}/>
              <Grid.Column width={4}>
                <Image circular className='userImage'
                       fluid
                       src={this.props.doc.image}/>
              </Grid.Column>
              <Grid.Column width={10} verticalAlign='middle' textAlign='justified'>
                <Header
                    as='h3'>{this.props.doc.name}, {this.props.doc.age}, {this.props.doc.gender}
                </Header>
                <p>{this.props.doc.description}</p>
              </Grid.Column>
              <Grid.Column width={1}/>
            </Grid.Row>
          </Grid>

          <Divider hidden/>
          <Divider hidden/>
          <Segment className='profThing'>
            <Divider horizontal className='profDivider'><Header as='h3'> + Matching information</Header></Divider>
            <Divider hidden/>
            <Grid textAlign='center'>
              <Grid.Row>
                <Grid.Column textAlign='center' width={15}>
                  <Table padded textalign='center'>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell> <Icon name='clipboard'/> <b>Interests</b></Table.Cell>
                        <Table.Cell>{this.props.doc.interests}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell> <Icon name='search'/> <b>Seeking</b></Table.Cell>
                        <Table.Cell>{this.props.doc.seeking}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell><Icon name='level up'/> <b>Level</b></Table.Cell>
                        <Table.Cell>{this.props.doc.level}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell><Icon name='chart line'/> <b>Goals</b></Table.Cell>
                        <Table.Cell>{this.props.doc.goals}</Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                  <AddNote className="commentBox"
                           owner={this.props.doc.owner}
                           contactId={this.props.doc._id}
                           madeBy={this.props.madeBy[0].name}
                           image={this.props.madeBy[0].image}/>
                  <Feed className="feedU">
                    {this.props.notes.map((note, index) => <Note key={index} note={note}
                                                                 profile={this.props.doc.owner}/>)}
                  </Feed>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Divider hidden/>
          </Segment>
          <Divider hidden/>
        </Container>
    );
  }
}

User.propTypes = {
  doc: PropTypes.object,
  notes: PropTypes.array.isRequired,
  madeBy: PropTypes.array,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(({ match }) => {
  const documentId = match.params._id;
  const subscription = Meteor.subscribe('TestProfiles');
  const subscription2 = Meteor.subscribe('Notes');
  const currentUser = Meteor.user() ? Meteor.user().username : '';
  return {
    doc: Profiles.findOne(documentId),
    notes: Notes.find({}).fetch(),
    madeBy: Profiles.find({ owner: currentUser }).fetch(),
    ready: subscription.ready() && subscription2.ready(),
  };
})(User);

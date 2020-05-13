import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Icon, Grid, Header, Table, Divider, Image, Loader, Segment, Feed } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Link, Redirect } from 'react-router-dom';
import { Profiles } from '../../api/profile/Profile';
import Note from '../components/Note';
import { Notes } from '../../api/note/Notes';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class UserProfile extends React.Component {
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    if (this.props.profiles[0].description === '') {
      return <Redirect to={`/editprofile/${this.props.profiles[0]._id}`}/>;
    }
    return (
        <Container>
          <Divider hidden/>
          <Divider hidden/>
          <Segment className='profThing'>
            <Grid>
              <Grid.Column width={13}>
                <Header as="h2" textalign="center">My Profile</Header>
              </Grid.Column>
              <Grid.Column width={3} textAlign='right'>
                <Icon className='segIcon' name='edit'/> <Link className='profLink'
                                                              to={`/editprofile/${this.props.profiles[0]._id}`}><b>Edit
                Profile</b></Link>
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
                       src={this.props.profiles[0].image}/>
              </Grid.Column>
              <Grid.Column width={10} verticalAlign='middle' textAlign='justified'>
                <Header
                    as='h3'>{this.props.profiles[0].name}, {this.props.profiles[0].age}, {this.props.profiles[0].gender}
                </Header>
                <p>{this.props.profiles[0].description}</p>
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
                        <Table.Cell>{_.map(this.props.profiles[0].interests, function (string) {
                          return `${string}  `;
                        })}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell> <Icon name='search'/> <b>Seeking</b></Table.Cell>
                        <Table.Cell>{this.props.profiles[0].seeking}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell><Icon name='level up'/> <b>Level</b></Table.Cell>
                        <Table.Cell>{this.props.profiles[0].level}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell><Icon name='chart line'/> <b>Goals</b></Table.Cell>
                        <Table.Cell>{this.props.profiles[0].goals}</Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                  <Feed className="feedU">
                    {this.props.notes.map((note, index) => <Note key={index} note={note}
                                                                 profile={this.props.profiles[0].owner}/>)}
                  </Feed>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Divider hidden/>
          </Segment>
        </Container>
    );
  }
}

UserProfile.propTypes = {
  profiles: PropTypes.array.isRequired,
  notes: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  const subscription = Meteor.subscribe('Profiles');
  const subscription2 = Meteor.subscribe('Notes');
  return {
    profiles: Profiles.find({}).fetch(),
    notes: Notes.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready(),
  };
})(UserProfile);

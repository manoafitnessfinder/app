import React from 'react';
import { Grid, Loader, Header, Divider, Icon, Menu, Image, Table, Container } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import { Link } from 'react-router-dom';
import { Profiles } from '../../api/profile/Profile';

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
          <Grid>
            <Grid.Column width={13}>
              <Header as="h2" textalign="center">{this.props.doc.name}&apos;s Profile</Header>
            </Grid.Column>
            <Grid.Column width={3} textAlign='right'>
              <Icon name='edit'/> <Link to={`/editprofile/${this.props.doc._id}`}>Edit Profile</Link>
            </Grid.Column>
          </Grid>
          <Menu widths={3} icon='labeled' inverted color='teal' className='userMenu'>
            <Menu.Item><Icon className='profileIcon' name='user'/> Add Friend</Menu.Item>
            <Menu.Item><Icon className='profileIcon' name='heart'/> Like Page</Menu.Item>
            <Menu.Item><Icon className='profileIcon' name='map'/> User Feed</Menu.Item>
          </Menu>
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
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <Table className="tableInfo" color='teal' inverted padded textalign='center'>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>Interests</Table.Cell>
                      <Table.Cell>{this.props.doc.interests}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Seeking</Table.Cell>
                      <Table.Cell>{this.props.doc.seeking}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Level</Table.Cell>
                      <Table.Cell>{this.props.doc.level}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Goals</Table.Cell>
                      <Table.Cell>{this.props.doc.goals}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
    );
  }
}

User.propTypes = {
  doc: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(({ match }) => {
  const documentId = match.params._id;
  const subscription = Meteor.subscribe('AllProfiles');
  return {
    doc: Profiles.findOne(documentId),
    ready: subscription.ready(),
  };
})(User);

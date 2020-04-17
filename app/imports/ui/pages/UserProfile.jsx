import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Icon, Grid, Menu, Header, Table, Divider, Image, Loader, Segment } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { AutoForm, ErrorsField, SubmitField, LongTextField } from 'uniforms-semantic';
import SimpleSchema from 'simpl-schema';
import { Stuffs } from '../../api/stuff/Stuff';
import swal from 'sweetalert';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  comment: String,
  quantity: Number,
  condition: {
    type: String,
    allowedValues: ['excellent', 'good', 'fair', 'poor'],
    defaultValue: 'good',
  },
});

/** Renders the Page for adding a document. */
class AddStuff extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { comment, quantity, condition } = data;
    const owner = Meteor.user().username;
    Stuffs.insert({ comment, quantity, condition, owner },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Item added successfully', 'success');
            formRef.reset();
          }
        });
  }
}

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class UserProfile extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    let fRef = null;
    return (
        <Container>
          <Divider hidden/>
          <Header as="h2" textAlign="center">Username's Profile</Header>
          <Menu widths={3} icon='labeled' inverted color='teal' className='userMenu'>
            <Menu.Item><Icon name='user'/> Add Friend</Menu.Item>
            <Menu.Item><Icon name='heart'/> Like Page</Menu.Item>
            <Menu.Item><Icon name='map'/> User Feed</Menu.Item>
          </Menu>
          <Divider hidden/>
          <Grid verticalAlign='middle'>
            <Grid.Row verticalAlign='middle' textAlign='justify'>
              <Grid.Column width={5}><Image circular className='userImage' fluid
                                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"/></Grid.Column>
              <Grid.Column width={11}>
                <Header as='h3'>NAME - AGE - GENDER</Header>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Divider hidden/>
          <Grid>
            <Grid.Row>
              <Grid.Column>
                  <Table className="tableInfo" color='teal' inverted padded textAlign='center'>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>Interests</Table.Cell>
                        <Table.Cell>Running, Lifting</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Seeking</Table.Cell>
                        <Table.Cell>Gym buddy</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Level</Table.Cell>
                        <Table.Cell>Beginner</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Goals</Table.Cell>
                        <Table.Cell>Run an 8 minute mile</Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
              </Grid.Column>
            </Grid.Row>
        </Grid>

          <Divider hidden/>


          <AutoForm ref={ref => {
            fRef = ref;
          }} schema={formSchema} onSubmit={data => this.submit(data, fRef)}>
            <Segment className="userComment">
              <LongTextField name='comment'/>
              <SubmitField value='Submit'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
          <Divider hidden/>
        </Container>

    );
  }
}

/** Require an array of Stuff documents in the props. */
UserProfile.propTypes = {
  stuffs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Stuff');
  return {

    ready: subscription.ready(),
  };
})(UserProfile);

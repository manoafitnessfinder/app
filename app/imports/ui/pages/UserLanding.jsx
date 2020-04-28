import React from 'react';
import { Container, Image, Card, Button, Grid, Icon } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class UserLanding extends React.Component {
  render() {
    return (
        <div className="aboutBackground">
          <Container>
            <Image centered src="/images/UserLanding1.JPG" fluid/>
            <Card.Group centered>
              <Card>
                <Card.Content>
                  <Image
                      floated='right'
                      size='mini'
                      src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                  />
                  <Card.Header>Event 1</Card.Header>
                  <Card.Meta>Add content here</Card.Meta>
                  <Card.Description>
                    Steve wants to add you to the group <strong>best friends</strong>
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <div className='ui two buttons'>
                    <Button basic color='green'>
                      Approve
                    </Button>
                    <Button basic color='red'>
                      Decline
                    </Button>
                  </div>
                </Card.Content>
              </Card>
              <Card>
                <Card.Content>
                  <Image
                      floated='right'
                      size='mini'
                      src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                  />
                  <Card.Header>Molly Thomas</Card.Header>
                  <Card.Meta>New User</Card.Meta>
                  <Card.Description>
                    Molly wants to add you to the group <strong>musicians</strong>
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <div className='ui two buttons'>
                    <Button basic color='green'>
                      Approve
                    </Button>
                    <Button basic color='red'>
                      Decline
                    </Button>
                  </div>
                </Card.Content>
              </Card>
              <Card>
                <Card.Content>
                  <Image
                      floated='right'
                      size='mini'
                      src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg'
                  />
                  <Card.Header>Jenny Lawrence</Card.Header>
                  <Card.Meta>New User</Card.Meta>
                  <Card.Description>
                    Jenny requested permission to view your contact details
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <div className='ui two buttons'>
                    <Button basic color='green'>
                      Approve
                    </Button>
                    <Button basic color='red'>
                      Decline
                    </Button>
                  </div>
                </Card.Content>
              </Card>
            </Card.Group>
            <Container id='user_landing_middle'>
                <Button animated className="matchButton" size="huge">
                  <Button.Content visible>Match</Button.Content>
                  <Button.Content hidden>
                    <Icon name='arrow right' />
                  </Button.Content>
                </Button>
            </Container>
            <Grid padded>
            <Grid.Row>
              <Grid.Column width={8}>
                <Image src="/images/UserLanding7.png" fluid/>
              </Grid.Column>
              <Grid.Column textAlign='center' width={8}>
                <Image src="/images/UserLanding4.PNG" fluid/>
              </Grid.Column>
            </Grid.Row>
            </Grid>
          </Container>
        </div>
    );
  }
}

export default UserLanding;

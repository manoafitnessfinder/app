import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Image, Container, Header, Segment, Button, Reveal } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        /* Outside to maintain consistent borders. */
        <Container className = 'landingPage'>
          <Container verticalAlign='middle' textAlign='center'>
            <Image className="landing" fluid src='/images/landing_page_top.PNG'/>
          </Container>
          <Header className = 'landingPage' textAlign='centered' as={'h1'}>
            Match based on what you are looking for!</Header>
          <Grid>
            <Grid.Row columns={3}>
              <Grid.Column>
                <Reveal animated='move left' instant>
                  <Reveal.Content visible>
                    <Image fluid src='/images/two_running.png'/>
                  </Reveal.Content>
                  <Reveal.Content hidden>
                    <br/>
                    <Header className = 'landingPage' textAlign='centered' as={'h1'}>
                      Schedule an event with a friend today!
                      <Button as={Link} to="/signup" className = 'landingPage' compact size='medium'>
                        Join Now!
                      </Button>
                    </Header>
                  </Reveal.Content>
                </Reveal>
              </Grid.Column>
              <Grid.Column>
                <Reveal animated='fade'>
                  <Reveal.Content visible>
                    <Image fluid src='/images/two_pushups.png'/>
                  </Reveal.Content>
                  <Reveal.Content hidden>
                    <br/>
                    <Header className = 'landingPage' textAlign='centered' as={'h1'}>
                      Don&apos;t get intimidated, match with someone at your level.
                    </Header>
                  </Reveal.Content>
                </Reveal>
              </Grid.Column>
              <Grid.Column>
                <Reveal animated='move right' instant>
                  <Reveal.Content visible>
                    <Image fluid src='/images/two_machines.png'/>
                  </Reveal.Content>
                  <Reveal.Content hidden>
                    <br/>
                    <Header className = 'landingPage' textAlign='centered' as={'h1'}>
                      The Freshmen Fifteen could happen to you, get started today.
                    </Header>
                  </Reveal.Content>
                </Reveal>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Header className = 'landingPage' textAlign='centered' as={'h1'}>
            Join today and work towards your better self!</Header>
          <Container className='landing_bottom_image'>
            <Segment basic floated='right' compact textAlign='center'>
              <Header className = 'landingPage' textAlign='center' as={'h1'}>
                <br/>Match With <br/> Someone today!<br/>
              </Header>
              <Button as={Link} to="/signup" className = 'landingPage' compact size='medium'>
                Join Now!
              </Button>
            </Segment>
          </Container>
        </Container>
    );
  }
}

export default Landing;

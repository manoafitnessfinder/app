import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Image, Container, Header, Segment, Button, Reveal } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        /* Outside to maintain consistent borders. */
        <Container>
          <Container verticalAlign='middle' textAlign='center'>
            <Image className="landing" fluid src='/images/landing_page_top.JPG'/>
          </Container>
          <Header inverted color='green' textAlign='centered' as={'h1'}>
            Match based on what you are looking for!</Header>
          <Grid>
            <Grid.Row columns={3}>
              <Grid.Column>
                <Reveal animated='move left' instant>
                  <Reveal.Content visible>
                    <Image fluid src='/images/two_running.png'/>
                  </Reveal.Content>
                  <Reveal.Content hidden>
                    <Header inverted color='green' textAlign='centered' as={'h1'}>
                      Don&apos;t get intimidated, match with someone at your skill level so you can meet your goals.
                    </Header>
                  </Reveal.Content>
                </Reveal>
              </Grid.Column>
              <Grid.Column>
                <Reveal animated='fade' instant>
                  <Reveal.Content visible>
                    <Image fluid src='/images/two_pushups.png'/>
                  </Reveal.Content>
                  <Reveal.Content hidden>
                    <br/>
                    <Header inverted color='green' textAlign='centered' as={'h1'}>
                      Schedule an event with a friend today!
                      <Button as={Link} to="/signup">
                        Get Started
                      </Button>
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
                    <Header inverted color='green' textAlign='centered' as={'h1'}>
                      The Freshmen Fifteen could happen to you, get started today making yourself into your best self.
                    </Header>
                  </Reveal.Content>
                </Reveal>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Header inverted color='green' textAlign='centered' as={'h1'}>
            Join today and work towards your better self!</Header>
          <Container className='landing_bottom_image'>
            <Segment floated='right' compact tertiary textAlign='center'>
              <Header inverted color='green' textAlign='center' as={'h1'}>Match With <br/> Someone today!<br/> </Header>
              <Button as={Link} to="/signup" color='green' compact size='medium'>
                Join Now!
              </Button>
            </Segment>
          </Container>
        </Container>
    );
  }
}

export default Landing;

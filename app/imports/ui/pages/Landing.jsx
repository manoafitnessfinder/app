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
                <Reveal animated = 'move left' instant>
                  <Reveal.Content visible>
                    <Image fluid src='/images/two_running.png'/>
                  </Reveal.Content>
                  <Reveal.Content hidden>
                    Testing move instant.
                  </Reveal.Content>
                </Reveal>
              </Grid.Column>
              <Grid.Column>
                <Reveal animated = 'fade' instant>
                  <Reveal.Content visible>
                    <Image fluid src='/images/two_pushups.png'/>
                  </Reveal.Content>
                  <Reveal.Content hidden>
                    Testing fade instant.
                  </Reveal.Content>
                </Reveal>
              </Grid.Column>
              <Grid.Column>
                <Reveal animated = 'move right' instant>
                  <Reveal.Content visible>
                    <Image fluid src='/images/two_machines.png'/>
                  </Reveal.Content>
                  <Reveal.Content hidden>
                    Testing move right instant.
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

import React from 'react';
import { Container, Image, Grid, Header } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class About extends React.Component {
  render() {
    return (
        <div className="aboutBackground">
        <Container>
          <Image centered src="/images/topImage3.PNG" fluid/>
          <Grid>
            <Grid.Row>
              <Grid.Column textAlign='center' width={8}>
                <Header as='h2'>
                  Who Are We
                </Header>
              </Grid.Column>
              <Grid.Column width={8}>
                <Image src="/images/about1.png" fluid/>
              </Grid.Column>
            </Grid.Row>
          <Grid.Row>
            <Grid.Column width={8}>
              <Image src="/images/about2.jpg" fluid/>
            </Grid.Column>
            <Grid.Column textAlign='center' width={8}>
              <Header as='h2'>
                Why We Matter
              </Header>
            </Grid.Column>
          </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign='center' width={8}>
                <Header as='h2'>
                  How Fitness Finder Works
                </Header>
              </Grid.Column>
              <Grid.Column width={8}>
                <Image src="/images/about3.jpg" fluid/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
        </div>
    );
  }
}

export default About;

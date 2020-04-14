import React from 'react';
import { Grid, Image, Container, GridColumn, Header } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        /* Outside to maintain consistent borders. */
        <Container>
          <Container>
            <Image bordered fluid src='/images/medicine_ball.jpg'/>
          </Container>
          <Header textAlign='centered' as={'h1'}>Match based on what you are looking for!</Header>
          <Grid divided = 'vertically'>
            <Grid.Row columns={3}>
              <Grid.Column>
                Test 1
              </Grid.Column>
              <Grid.Column>
                Test 2
              </Grid.Column>
              <Grid.Column>
                Test 3
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid>
            <GridColumn>
              <Grid columns='equal' verticalAlign='middle' textAlign='center'>
                <Image size='small' circular src="/images/meteor-logo.png"/>
                <h1>Welcome to this template</h1>
                <p>Now get to work and modify this app!</p>
              </Grid>
            </GridColumn>
          </Grid>
        </Container>
    );
  }
}

export default Landing;

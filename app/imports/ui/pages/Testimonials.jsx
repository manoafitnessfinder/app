import React from 'react';
import { Grid, Image } from 'semantic-ui-react';

class Testimonial extends React.Component {

  render() {
    return (
        <Grid container verticalAlign="middle" columns={2}>
          <Grid.Row>
            <Grid.Column align="center">
              <Image src="/images/test2.jpg"  height="400" width="300"/>
            </Grid.Column>
            <Grid.Column textAlign="center" style={{ color: '#6D9B7C' }}>
                <h2>I LOVE using Manoa Fitness Finder! It is so easy to create events and meet up with other students. I
                    find
                    myself being more motivated to exercise or go on hikes because it feels more like hanging out with
                    friends! - Angie G.</h2>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column textAlign="center" style={{ color: '#6D9B7C' }}>
                <h2>I really like using Manoa Fitness finder for whenever I feel like going for a run or hike. Not only
                    have I
                    met new people through it, but I feel safer when I run. - Mandy R.</h2>
            </Grid.Column>
            <Grid.Column align="center">
              <Image src="/images/test3.jpg" height="400" width="300"/>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column align="center">
              <Image src="/images/test1.JPG"  height="400" width="300"/>
            </Grid.Column>
            <Grid.Column textAlign="center" style={{ color: '#6D9B7C' }}>
                <h2>Whether you wanna meet up with friends or random people to surf, lift weights, or play
                    basketball, Manoa Fitness finder has made it really easy to do so. - Jon E.</h2>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column textAlign="center" style={{ color: '#6D9B7C' }}>
                <h2>I&apos;ve only been using Manoa Fitness Finder for a little bit, but so far I&apos;ve really enjoyed
                    my experience. I&apos;m a new student and have an easy time finding other students with similar interest as mine. I
                    now am able to play volleyball every weekend and meet new people in the process. - Sally B.</h2>
            </Grid.Column>
            <Grid.Column align="center">
              <Image src="/images/test4.jpg"  height="400" width="300"/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
    );
  }
}

export default Testimonial;

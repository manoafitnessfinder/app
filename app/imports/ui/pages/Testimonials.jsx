import React from 'react';
import { Grid, Image } from 'semantic-ui-react';

class Testimonial extends React.Component {

    render() {
        return (
            <Grid container verticalAlign="middle" columns={2} >
                <Grid.Row>
                    <Grid.Column>
                        <Image size="large" src="/images/test1.png" />
                    </Grid.Column>
                    <Grid.Column textAlign="center">
                        I LOVE using Manoa Fitness Finder! It is so easy to create events and meet up with other students. I find myself being more motivated to exercise or go on hikes because it feels more like hanging out with friends! - Angie G.
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column textAlign="center">
                        I really like using Manoa Fitness finder for whenever I feel like going for a run or hike. Not only have I met new people through it, but I feel safer when I run. - Mandy R.
                    </Grid.Column>
                    <Grid.Column>
                        <Image size="large" src="/images/test3.png" />
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column>
                        <Image size="large" src="/images/test2.png" />
                    </Grid.Column>
                    <Grid.Column textAlign="center">
                        Whether you wanna meet up with friends or random people to surf, lift weights, or play
                        basketball, Manoa Fitness finder has made it really easy to do so. - Jon E.
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column textAlign="center">
                        I've only been using Manoa Fitness Finder for a little bit, but so far I've really enjoyed my experience. I'm a new student and have an easy time finding other students with similar interest as mine. I now am able to play volleyball every weekend and meet new people in the process. - Sally B.
                    </Grid.Column>
                    <Grid.Column>
                        <Image size="large" src="/images/test4.png" />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

export default Testimonial;

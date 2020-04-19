import React from 'react';
import { Grid, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { paddingTop: '15px' };
    return (
        <footer>
          <Grid style={divStyle} centered stackable columns='3' container>
            <Grid.Column>
              <h3 textalign='left'>About Us</h3>
              <hr/>
              <p>
                <a href="https://github.com/manoafitnessfinder/app/">Our github page</a>
              </p>
              <p>
                <a href="https://manoafitnessfinder.github.io/">Github.io page</a>
              </p>
              <p>
                <a href="https://manoafitnessfinder.github.io/#team-members">Meet the team</a>
              </p>
            </Grid.Column>

            <Grid.Column>
              <h3 textalign='left'>Sitemap (Work in progress)</h3>
              <hr/>
              <p>
                <Menu.Item
                    as={NavLink}
                    activeClassName="active"
                    exact to="/profile"
                    key='profile'>Profile
                </Menu.Item>
              </p>
            </Grid.Column>

            <Grid.Column>
              <h3>
                { /* Later possibility to add an email box here to autofill
                the signup page box from the user entered text */ }
                <Menu.Item textalign='left'
                           as={NavLink}
                           activeClassName="active"
                           exact to="/signup"
                           key='signup'>Create your account today!</Menu.Item></h3>
              <hr/>
              <p>With all the workout and social possibilities, why wait? Create an account with Manoa Fitness Finder
                today!</p>
            </Grid.Column>
          </Grid>
        </footer>
    );
  }
}

export default Footer;

import React from 'react';
import { Grid, Image } from 'semantic-ui-react';

class Contact extends React.Component {

  render() {
      const gridStyle = { height: '550px', paddingTop: '100px' };
      return (
          <Grid style={gridStyle} centered stackable columns='2' container>
            <Grid.Column>
              <Image src="/images/contactP.jpg" />
            </Grid.Column>
            <Grid.Column textAlign="center" style={{ color: '#6D9B7C' }}>
                <h1>Have any issues, comments, or suggestions?</h1>
                <hr/>
                <h2>We would love to hear from you!</h2>
                <h3>email us at:</h3>
                <h3>manoafitnessfinder@gmail.com</h3>
            </Grid.Column>
        </Grid>
    );
  }
}

export default Contact;

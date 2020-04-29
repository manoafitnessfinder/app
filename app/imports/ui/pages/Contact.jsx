import React from 'react';
import { Grid, Image } from 'semantic-ui-react';

class Contact extends React.Component {

  render() {
      const gridStyle = { height: '800px' };
      return (
        <Grid container verticalAlign="middle" style={gridStyle}>
          <Grid.Row>
            <Grid.Column>
              <Image src="/images/Contact.jpg" />
            </Grid.Column>
          </Grid.Row>
        </Grid>
    );
  }
}

export default Contact;

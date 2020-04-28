import React from 'react';
import { Image } from 'semantic-ui-react';

class top extends React.Component {
  render() {
    const divStyle = { paddingTop: '30px', paddingBottom: '5px' };
    return (
        <header>
          <div style={divStyle} >
            <Image src="/images/logo.png" size='small' centered/>
          </div>
        </header>
    );
  }
}

export default top;

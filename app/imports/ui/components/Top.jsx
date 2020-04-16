import React from 'react';
import { Image } from 'semantic-ui-react';

class top extends React.Component {
  render() {
    const divStyle = { paddingTop: '30px' };
    return (
        <header>
          <div style={divStyle} className="ui center aligned container">
            <Image src="/images/logo.png" size='small' centered/>
          </div>
        </header>
    );
  }
}

export default top;

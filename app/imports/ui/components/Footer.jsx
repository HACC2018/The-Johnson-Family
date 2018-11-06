import React from 'react';
import { Image } from 'semantic-ui-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const imgStyle = {
      width: '150px',
      height: '50px',
      position: 'center',
    };

    const divStyle = { paddingTop: '15px' };
    return (
        <footer>
          <div className='footer-background'>
          <div style={divStyle} className="ui center aligned container"><Image
                src="https://cdn.discordapp.com/attachments/508521520109453314/508834015080349706/gatherwhite.png"
                style={imgStyle} centered/>
          </div>
          </div>
        </footer>
    );
  }
}

export default Footer;

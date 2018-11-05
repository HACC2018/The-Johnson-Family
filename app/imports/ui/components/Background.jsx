import React from 'react';
import { Grid, Header, Image } from 'semantic-ui-react';

export default class Background extends React.Component {
  render() {
    const headerStyle = {
      fontSize: '40px',
      color: 'white',
      paddingTop: '80px',
    };

    const pStyle = {
      fontSize: '30px',
      color: 'white',
    };
    return (
        <div className="continue-background">
          <Grid container textAlign="center" verticalAlign="middle">
            <Grid.Row>
              <Header as="h1" style={headerStyle}>
                FIGHTING TO REDUCE GREENHOUSE GAS EMISSIONS AT ALL UNIVERSITY OF HAWAII CAMPUSES.
              </Header>
            </Grid.Row>

            <Grid.Row columns={2}>
              <Grid.Column fluid>
                <p style={pStyle}><b>Greenhouse gas emissions are changing the world at an alarming rate. The UH
                  Department of Sustainability wants to set an example by reforming UH into a sustainable institution.
                  To do that, they need to identify and target the most problematic contributors quickly and
                  efficiently.</b></p>
              </Grid.Column>
              <Grid.Column fluid>
                <Image src='https://cdn.discordapp.com/attachments/508521520109453314/508909069512474624/iphone.png'/>

              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
    );
  }
}

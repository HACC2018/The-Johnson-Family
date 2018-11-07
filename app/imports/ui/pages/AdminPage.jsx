import React from 'react';
import { Grid, Header, Icon, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */
class AdminPage extends React.Component {
  render() {

    const style = {
      margin: '0px',
      paddingTop: '30px',
      paddingBottom: '500px',
    };

    const styles2 = {
      margin: '0px',
      padding: '0px',
    };

    const iconStyle = {
      color: '#3fba5a',
    };

    const bodyStyle = {
      paddingTop: '30px',
      paddingBottom: '30px',
    };

    return (
        <Grid container style={bodyStyle} divided='vertically'>
          <Grid.Row columns={4} verticalAlign='middle'>
            <Grid.Column>
              <Link to={'#'}><Segment>
                <Grid columns={2} stackable textAlign='center'>
                  <Grid.Row verticalAlign='middle'>
                    <Grid.Column>
                      <Header as="h1" style={styles2}>
                        Data Retrieval
                      </Header>
                    </Grid.Column>
                    <Grid.Column>
                      <Icon name='chart pie' size='huge' style={iconStyle}/>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
              </Link>
            </Grid.Column>

            <Grid.Column>
              <Link to={'#'}><Segment>
                <Grid columns={2} stackable textAlign='center'>
                  <Grid.Row verticalAlign='middle'>
                    <Grid.Column>
                      <Header as="h1" style={styles2}>
                        Pending Audits
                      </Header>
                    </Grid.Column>
                    <Grid.Column>
                      <Icon name='clipboard' size='huge' style={iconStyle}/>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
              </Link>
            </Grid.Column>

            <Grid.Column>
              <Link to={'#'}><Segment>
                <Grid columns={2} stackable textAlign='center'>
                  <Grid.Row verticalAlign='middle'>
                    <Grid.Column>
                      <Header as="h1" style={styles2}>
                        Submit Data
                      </Header>
                    </Grid.Column>
                    <Grid.Column>
                      <Icon name='add' size='huge' style={iconStyle}/>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
              </Link>
            </Grid.Column>

            <Grid.Column>
              <Link to={'#'}><Segment>
                <Grid columns={2} stackable textAlign='center'>
                  <Grid.Row verticalAlign='middle'>
                    <Grid.Column>
                      <Header as="h1" style={styles2}>
                        Edit Locations
                      </Header>
                    </Grid.Column>
                    <Grid.Column>
                      <Icon name='building outline' size='huge' style={iconStyle}/>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
              </Link>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Header as="h1" style={style}>
              Some Content Here - Recently Addded Bags ?
            </Header>
          </Grid.Row>
        </Grid>
    );
  }
}

export default AdminPage;

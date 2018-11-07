import React from 'react';
import { Grid, Header, Icon, Segment } from 'semantic-ui-react';
import { withRouter, Link } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */
class AdminOptions extends React.Component {
  render() {

    const styles2 = {
      margin: '0px',
      padding: '0px',
    };

    const iconStyle = {
      color: '#3fba5a',
    };

    return (
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
              <Link to={'/pending'}><Segment>
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
    );
  }
}

export default withRouter(AdminOptions);

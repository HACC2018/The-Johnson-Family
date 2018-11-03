import React from 'react';
import { Grid, Header, Icon, Segment } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class StatSegment extends React.Component {
  render() {

    const styles = {
      fontSize: '10px',
      margin: '0px',
      padding: '0px',
    };

    const styles2 = {
      margin: '0px',
      padding: '0px',
    };

    return (
        <Segment>
          <Grid columns={2} stackable textAlign='center'>
            <Grid.Row verticalAlign='middle'>
              <Grid.Column>
                <p style={styles}>
                  STATISTICS
                </p>
                <Header as="h3" style={styles2}>
                  1,324
                </Header>
              </Grid.Column>
              <Grid.Column>
                <Header>
                  <Icon name='users' size='large' color='grey'/>
                </Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
    );
  }
}

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(StatSegment);

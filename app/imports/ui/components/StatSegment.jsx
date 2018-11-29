import React from 'react';
import { Grid, Header, Icon, Segment } from 'semantic-ui-react';

/** Renders a single row in the StatSegment table. */
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

    const iconStyle = {
      color: '#d5d5d5',
    };

    const iconStyle2 = {
      color: '#ace1af',
    };

    return (
        <Segment>
          <Grid columns={3} stackable textAlign='center'>
            <Grid.Row verticalAlign='middle'>
              <Grid.Column>
                <p style={styles}>
                  {this.props.text}
                </p>
                <Header as="h3" style={styles2}>
                  {this.props.data}
                </Header>
              </Grid.Column>


              <Grid.Column>
                {/*<Icon name='up arrow' size='small' style={iconStyle2}/>*/}
              </Grid.Column>


              <Grid.Column>
                <Header>
                  <Icon name={this.props.icon} size='large' style={iconStyle}/>
                </Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
    );
  }
}

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default StatSegment;

import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import AdminOptions from '../components/AdminOptions';
import ListLocations from '../components/ListLocations';

/** A simple static component to render some text for the landing page. */
class AddViewLocations extends React.Component {
  render() {

    const style = {
      margin: '0px',
      paddingTop: '40px',
      paddingBottom: '40px',
      textDecoration: 'underline',
    };

    const bodyStyle = {
      paddingTop: '30px',
      paddingBottom: '500px',
    };

    return (
        <Grid container style={bodyStyle} divided='vertically' textAlign='center' verticalAlign='middle'>
          <AdminOptions/>

          <Grid.Row>
            <Header as="h1" style={style}>
              Locations
            </Header>
            <ListLocations/>
          </Grid.Row>
          <Grid.Row>

          </Grid.Row>
        </Grid>
    );
  }
}

export default AddViewLocations;

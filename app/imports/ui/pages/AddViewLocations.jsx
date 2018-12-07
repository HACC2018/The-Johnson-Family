import React from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';
import AdminOptions from '../components/AdminOptions';
import AddLocations from '../components/AddLocations';
import ListLocations from '../components/ListLocations';
import AddBag from '../components/AddBag';
import ListBag from '../components/ListBag';

/** A simple static component to render some text for the landing page. */
class AddViewLocations extends React.Component {
  render() {

    const style = {
      margin: '0px',
      paddingTop: '30px',
      paddingBottom: '500px',
    };

    const bodyStyle = {
      paddingTop: '30px',
      paddingBottom: '30px',
    };

    return (
        <div>
        <Grid container style={bodyStyle} divided='vertically' verticalAlign='middle'>
          <AdminOptions/>

            <Grid.Row columns={2}>
              <Grid.Column>
                <AddLocations/>
              </Grid.Column>
              <Grid.Column>
                <ListLocations/>
              </Grid.Column>
            </Grid.Row>


        </Grid>
        </div>
    );
  }
}

export default AddViewLocations;

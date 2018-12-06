import React from 'react';
import { Grid, Header, Loader, Segment } from 'semantic-ui-react';
import { Locations } from '../../api/Locations/Locations';
import AdminOptions from '../components/AdminOptions';
import ListLocations from '../components/ListLocations';
import AddLocations from '../components/AddLocations';
import { Meteor } from "meteor/meteor";
import PropTypes from 'prop-types';
import * as db from '../../api/Wrapper/Wrapper';
import { withTracker } from 'meteor/react-meteor-data';

/** A simple static component to render some text for the landing page. */
class AddViewLocations extends React.Component {
  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
  }

  deleteCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: 'Delete failed: ${error.message}' });
    } else {
      Bert.alert({ type: 'success', message: 'Delete succeeded' });
    }
  }

  onDelete(id) {
    Locations.remove(id, this.deleteCallback);
  }

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
  }
    renderPage() {

      return (
          <div>
            <Grid container divided='vertically'>
              <Grid.Row columns={2}>
                <Grid.Column>
                  <AddLocations/>
                </Grid.Column>
                {/*<Grid.Column>*/}
                  {/*<ListLocations*/}
                      {/*data={db.getBagLinkedCollections(this.props.locations)}*/}
                      {/*onDelete={this.onDelete}*/}
                  {/*/>*/}
                {/*</Grid.Column>*/}
              </Grid.Row>
            </Grid>
          </div>
    );
  }
}

AddViewLocations.propTypes = {
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  const s1 = Meteor.subscribe('Locations');
  return {
    locations: Locations.find({}).fetch(),
    ready:
        s1.ready()
  };
})(AddViewLocations);

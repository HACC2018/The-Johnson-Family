import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import AdminOptions from '../components/AdminOptions';
import ListForms from '../components/ListForms';
import * as db from '../../api/Wrapper/Wrapper';

/** A simple static component to render some text for the landing page. */
class ViewForms extends React.Component {
  render() {

    db.getCollection(db.constants.codes.forms);

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
              Forms
            </Header>
            <ListForms/>
          </Grid.Row>
        </Grid>
    );
  }
}

ViewForms.propTypes = {
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  // Get access to Stuff documents.
  const s1 = Meteor.subscribe('Forms');
  return {
    ready:
        s1.ready(),
  };
})(ViewForms);

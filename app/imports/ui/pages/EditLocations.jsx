import React from 'react';
import { Grid, Header, Loader, Segment } from 'semantic-ui-react';
import AdminOptions from '../components/AdminOptions';
import { Bert } from 'meteor/themeteorchef:bert';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Locations, LocationsSchema } from '../../api/Locations/Locations';
import AutoForm from 'uniforms-semantic/AutoForm';
import { Meteor } from "meteor/meteor";
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { AutoField } from 'uniforms-semantic';
import ListLocations from '../components/ListLocations';

/** A simple static component to render some text for the landing page. */
class EditLocations extends React.Component {
  /** On successful submit, insert the data. */
  submit(data) {
    const { name, street, city, state, zip_code, _id } = data;
    Locations.update(_id, { $set: { name, street, city, state, zip_code } }, (error) => (error ?
        Bert.alert({ type: 'danger', message: `Update failed: ${error.message}` }) :
        Bert.alert({ type: 'success', message: 'Update succeeded' })));
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;

    const style = {
      margin: '0px',
      paddingTop: '30px',
      paddingBottom: '500px',
    };

  }


    renderPage()
    {
      return (
          <Grid container style={style} divided='vertically'>
            <AdminOptions/>

            <Grid.Row columns={2}>
              <Grid.Column>
                <Header as="h1">
                  EDIT LOCATIONS PAGE
                </Header>

                <AutoForm schema={LocationsSchema} onSubmit={this.submit} model={this.props.doc}>
                  <Segment>
                    <AutoField name='name'/>
                    <AutoField name='street'/>
                    <AutoField name='city'/>
                    <AutoField name='state'/>
                    <AutoField name='zip_code'/>
                    <SubmitField value='Submit'/>
                    <ErrorsField/>
                  </Segment>
                </AutoForm>
              </Grid.Column>

              <Grid.Column>
                <ListLocations/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
      );
    }
}

/** Require the presence of a Location document in the props object. Uniforms adds 'model' to the props, which we use. */
EditLocations.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Location documents.
  const subscription = Meteor.subscribe('Locations');
  return {
    doc: Locations.findOne(documentId),
    ready: subscription.ready(),
  };
})(EditLocations);



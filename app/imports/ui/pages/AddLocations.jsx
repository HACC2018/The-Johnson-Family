import React from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';
import { Bert } from 'meteor/themeteorchef:bert';
import AutoForm from 'uniforms-semantic/AutoForm';
import SubmitField from 'uniforms-semantic/SubmitField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Locations, LocationsSchema } from '../../api/Locations/Locations';
import { AutoField, HiddenField } from 'uniforms-semantic';
import { Meteor } from "meteor/meteor";
import * as db from '../../api/Wrapper/Wrapper';

/** A simple static component to render some text for the landing page. */
class AddLocations extends React.Component {

  /** Bind 'this' so that a ref to the FormItem can be saved in formRef and communicated between render() and submit(). */
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.insertCallback = this.insertCallback.bind(this);
    this.formRef = null;
  }

  /** Notify the user of the results of the submit. If successful, clear the form. */
  insertCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Add failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Add succeeded' });
      this.formRef.reset();
    }
  }

  /** On submit, insert the data. */
  submit(data) {
    const { name, street, city, state, zip_code } = data;
    const owner = Meteor.user().username;
    db.addNewLocation(name, street, city, state, zip_code)
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Add Locations</Header>
            <AutoForm ref={(ref) => { this.formRef = ref; }} schema={LocationsSchema} onSubmit={this.submit}>
              <Segment>
                /* TODO: Change the AutoFields to its appropriate fields for proper validation. */
                <AutoField name='name'/>
                <AutoField name='street'/>
                <AutoField name='city'/>
                <AutoField name='state'/>
                <AutoField name='zip_code'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
                <HiddenField name='owner' value='fakeuser@foo.com'/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

export default AddLocations;

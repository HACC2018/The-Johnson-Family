import React from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';
import { Bert } from 'meteor/themeteorchef:bert';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import NumField from 'uniforms-semantic/NumField';
import SubmitField from 'uniforms-semantic/SubmitField';
import DateField from 'uniforms-semantic/DateField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Locations, LocationsSchema } from '../../api/Locations/Locations';
import { Buildings, BuildingsSchema } from '../../api/Buildings/Buildings';
import { AutoField, HiddenField } from 'uniforms-semantic';
import { Events, EventsSchema } from '../../api/Events/Events';
import SelectField from 'uniforms-semantic/SelectField';


/** A simple static component to render some text for the landing page. */
class AdminPageAdd extends React.Component {

  /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
  constructor(props) {
    super(props);
    this.submitLocation = this.submitLocation.bind(this);
    this.submitBuilding = this.submitBuilding.bind(this);
    this.submitEvent = this.submitEvent.bind(this);
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
  submitLocation(data) {
    const { name, street, city, state, zip_code } = data;
    Locations.insert({ name, street, city, state, zip_code }, this.insertCallback);
  }

  submitBuilding(data) {
    const { name, location_id } = data;
    Buildings.insert({ name, location_id }, this.insertCallback);
  }

  submitEvent(data) {
    const { name, date } = data;
    Events.insert({ name, date }, this.insertCallback);
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    const options = ["Hawaii", "Arkansas"];
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Add Locations</Header>
            <AutoForm ref={(ref) => { this.formRef = ref; }} schema={LocationsSchema} onSubmit={this.submitLocation}>
              <Segment>
                <TextField name='name'/>
                <TextField name='street'/>
                <TextField name='city'/>
                <SelectField name='state'/>
                <NumField name='zip_code'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>

            <Header as="h2" textAlign="center">Add Buildings</Header>
            <AutoForm ref={(ref) => { this.formRef = ref; }} schema={BuildingsSchema} onSubmit={this.submitBuilding}>
              <Segment>
                /* TODO: Change the AutoFields to its appropriate fields for proper validation. */
                <TextField name='name'/>
                <AutoField name='location_id'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>

            <Header as="h2" textAlign="center">Events</Header>
            <AutoForm ref={(ref) => { this.formRef = ref; }} schema={EventsSchema} onSubmit={this.submitEvent}>
              <Segment>
                <TextField name='name'/>
                <DateField name='date'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

export default AdminPageAdd;

import React from 'react';
import { TrashBags, TrashBagsSchema } from '/imports/api/TrashBags/TrashBags';
import { Grid, Segment, Header } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import NumField from 'uniforms-semantic/TextField';
import SelectField from 'uniforms-semantic/SelectField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';
import SubmitField from 'uniforms-semantic/SubmitField';
// import { withTracker } from 'meteor/react-meteor-data';
import Locations from '/imports/api/Locations/Locations';

/** Renders the Page for adding a document. */
class AddBag extends React.Component {

  /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
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
    const { category_id, weight, volume, count, event_id, location_id, building_id, accepted } = data;
    const owner = Meteor.user().username;
    TrashBags.insert({ category_id, weight, volume, count, event_id, location_id, building_id, accepted, owner }, this.insertCallback);
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Add Bag</Header>
            <AutoForm ref={(ref) => { this.formRef = ref; }} schema={TrashBagsSchema} onSubmit={this.submit}>
              <Segment>
                <SelectField name="category_id"/>
                <NumField name="weight"/>
                <NumField name="volume"/>
                <NumField name="count"/>
                <SelectField name="event_id"/>
                <SelectField name="location_id" />
                <SelectField name="building_id"/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
                <HiddenField name="owner" value="fake@foo.com"/>
                <HiddenField name="accepted" value={false}/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

export default AddBag;


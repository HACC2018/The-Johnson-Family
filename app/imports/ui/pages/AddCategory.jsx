import React from 'react';
import { TrashBags, TrashBagsSchema } from '/imports/api/TrashBags/TrashBags';
import { Grid, Segment, Header, Dropdown } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import SelectField from 'uniforms-semantic/SelectField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';
import SubmitField from 'uniforms-semantic/SubmitField';
// import { withTracker } from 'meteor/react-meteor-data';
import Locations from '/imports/api/Locations/Locations';
import { CategoriesSchema } from '../../api/Categories/Categories';
import { NavLink } from 'react-router-dom';

/** Renders the Page for adding a document. */
class AddCategory extends React.Component {

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
    const { name, parent_id, level } = data;
    const owner = Meteor.user().username;
    TrashBags.insert({ name, parent_id, level, owner }, this.insertCallback);
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Add Category</Header>
            <AutoForm ref={(ref) => { this.formRef = ref; }} schema={CategoriesSchema} onSubmit={this.submit}>
              <Segment>
                <TextField name="name"/>
                <Dropdown item text = "parent_id(subcategory)">
                  <Dropdown.menu>
                    <Dropdown.Item>Cups</Dropdown.Item>
                    <Dropdown.Item>Shirts</Dropdown.Item> 
                  </Dropdown.menu>
                </Dropdown>
                <TextField name="level"/>
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

export default AddCategory;


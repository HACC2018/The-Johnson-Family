import React from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';
import { Bert } from 'meteor/themeteorchef:bert';
import AutoForm from 'uniforms-semantic/AutoForm';
import SubmitField from 'uniforms-semantic/SubmitField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { AutoField, HiddenField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import * as db from '../../api/Wrapper/Wrapper';
import { Categories, CategoriesSchema } from '../../api/Categories/Categories';

/** A simple static component to render some text for the landing page. */
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
    const { name, parent_id } = data;
    db.addNewCategory(name, parent_id);
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    const catOps = this.props.categories.map(c => ({ label: c.name, value: c._id }));
    catOps.unshift({ label: 'None (Creates new root category)', value: 0 });
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Add Category</Header>
            <AutoForm ref={(ref) => {
              this.formRef = ref;
            }} schema={CategoriesSchema} onSubmit={this.submit}>
              <Segment>
                <AutoField name='name'/>
                <AutoField name={'parent_id'} options={catOps}/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

/** Require an array of Contacts documents in the props. */
AddCategory.propTypes = {
  categories: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Contacts documents.
  const s1 = Meteor.subscribe('Categories');
  return {
    categories: Categories.find({}).fetch(),
    ready: s1.ready(),
  };
})(AddCategory);

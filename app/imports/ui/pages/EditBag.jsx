import React from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';
import { TrashBags, TrashBagSchema } from '/imports/api/TrashBags/TrashBags';
import * as db from '../../api/Wrapper/Wrapper';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import NumField from 'uniforms-semantic/NumField';
import SelectField from 'uniforms-semantic/SelectField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Meteor } from 'meteor/meteor';
import ListBag from '../components/ListBag';

/** Renders the Page for editing a single document. */
class EditBag extends React.Component {
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (
        <Grid container divided='vertically'>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Header as="h2" textAlign="center">Edit Bag</Header>
              <AutoForm onSubmit={this.submit} model={this.props.doc}>
                <Segment>
                  <TextField name=''/>
                  <SelectField name='type'/>
                  <NumField name='weight' decimal={false}/>
                  <NumField name='volume' decimal={false}/>
                  <NumField name='count' decimal={false}/>
                  <SubmitField value='Submit'/>
                  <ErrorsField/>
                  <HiddenField name='owner'/>
                </Segment>
              </AutoForm>
            </Grid.Column>
            <Grid.Column>
              <ListBag/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
    );
  }
}

export default EditBag;

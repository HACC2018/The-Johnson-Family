import React from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';
import { Bert } from 'meteor/themeteorchef:bert';
import AutoForm from 'uniforms-semantic/AutoForm';
import SubmitField from 'uniforms-semantic/SubmitField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Locations } from '/imports/api/Locations/Locations';
import { AutoField, HiddenField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import * as db from '../../api/Wrapper/Wrapper';
import { Buildings, BuildingsSchema } from '../../api/Buildings/Buildings';

/** A simple static component to render some text for the landing page. */
class AddBuilding extends React.Component {

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
    const { name, location_id } = data;
    db.addNewBuilding(name, location_id);
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Add Building</Header>
            <AutoForm ref={(ref) => {
              this.formRef = ref;
            }} schema={BuildingsSchema} onSubmit={this.submit}>
              <Segment>
                <AutoField name='name'/>
                <AutoField
                    name={'location_id'}
                    options=
                        {
                          this.props.locs.map(loc => ({ label: loc.name, value: loc._id }))
                        }
                />
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
AddBuilding.propTypes = {
  buildings: PropTypes.array.isRequired,
  locs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Contacts documents.
  const s1 = Meteor.subscribe('Buildings');
  const s2 = Meteor.subscribe('Locations');
  return {
    buildings: Buildings.find({}).fetch(),
    locs: Locations.find({}).fetch(),
    ready: s1.ready() && s2.ready(),
  };
})(AddBuilding);

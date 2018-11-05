import React from 'react';
import { Grid, Loader, Header, Segment } from 'semantic-ui-react';
import { TrashBags, TrashBagsSchema } from '/imports/api/TrashBags/TrashBags';
import { Bert } from 'meteor/themeteorchef:bert';
import AutoForm from 'uniforms-semantic/AutoForm';
import NumField from 'uniforms-semantic/NumField';
import SelectField from 'uniforms-semantic/SelectField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders the Page for editing a single document. */
class EditBag extends React.Component {

  /** On successful submit, insert the data. */
  submit(data) {
    const { category_id, weight, volume, count, event_id, location_id, building_id, accepted } = data;
    TrashBags.update(_id, { $set: { id, type, weight, volume } }, (error) => (error ?
        Bert.alert({ type: 'danger', message: `Update failed: ${error.message}` }) :
        Bert.alert({ type: 'success', message: 'Update succeeded' })));
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center" inverted>Edit Bag</Header>
            <AutoForm schema={TrashBagsSchema} onSubmit={this.submit} model={this.props.doc}>
              <Segment>
                <SelectField name="category_id"/>
                <NumField name="weight"/>
                <NumField name="volume"/>
                <NumField name="count"/>
                <SelectField name="event_id"/>
                <SelectField name="location_id"/>
                <SelectField name="building_id"/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
                <HiddenField name="owner" value="fake@foo.com"/>
                <HiddenField name="accepted" value="false"/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

/** Require the presence of a Bag document in the props object. Uniforms adds 'model' to the props, which we use. */
EditBag.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Bag documents.
  const subscription = Meteor.subscribe('TrashBags');
  return {
    doc: TrashBags.findOne(documentId),
    ready: subscription.ready(),
  };
})(EditBag);

import React from 'react';
import { Grid, Header, Loader, Segment } from 'semantic-ui-react';
import { Bert } from 'meteor/themeteorchef:bert';
import SubmitField from 'uniforms-semantic/SubmitField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import AutoForm from 'uniforms-semantic/AutoForm';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { AutoField } from 'uniforms-semantic';
import { Buildings, BuildingsSchema } from '/imports/api/Buildings/Buildings';
import { Locations } from '../../api/Locations/Locations';
import AdminOptions from '../components/AdminOptions';
import ListBuildings from '../components/ListBuildings';

/** A simple static component to render some text for the landing page. */
class EditBuildings extends React.Component {
  /** On successful submit, insert the data. */
  submit(data) {
    const { name, location_id, _id } = data;
    Buildings.update(_id, { $set: { name, location_id } }, (error) => (error ?
        Bert.alert({ type: 'danger', message: `Update failed: ${error.message}` }) :
        Bert.alert({ type: 'success', message: 'Update succeeded' })));
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }


    renderPage() {
      const style = {
        margin: '0px',
        paddingTop: '30px',
        paddingBottom: '500px',
      };

      return (
          <Grid container style={style} divided='vertically'>
            <AdminOptions/>

            <Grid.Row columns={2}>
              <Grid.Column>
                <Header as="h1">
                  Edit Building
                </Header>

                <AutoForm schema={BuildingsSchema} onSubmit={this.submit} model={this.props.doc}>
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

              <Grid.Column>
                <ListBuildings/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
      );
    }
}

/** Require the presence of a Location document in the props object. */
EditBuildings.propTypes = {
  doc: PropTypes.object,
  locs: PropTypes.array.isRequired,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Location documents.
  const s1 = Meteor.subscribe('Buildings');
  const s2 = Meteor.subscribe('Locations');
  return {
    doc: Buildings.findOne(documentId),
    locs: Locations.find({}).fetch(),
    ready: s1.ready() && s2.ready(),
  };
})(EditBuildings);

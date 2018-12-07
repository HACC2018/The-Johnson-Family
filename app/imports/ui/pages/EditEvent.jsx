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
import { Events, EventsSchema } from '/imports/api/Events/Events';
import AdminOptions from '../components/AdminOptions';
import ListEvents from '../components/ListEvents';

/** A simple static component to render some text for the landing page. */
class EditEvent extends React.Component {
  /** On successful submit, insert the data. */
  submit(data) {
    const { name, date, _id } = data;
    Events.update(_id, { $set: { name, date } }, (error) => (error ?
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
                  Edit Event
                </Header>

                <AutoForm schema={EventsSchema} onSubmit={this.submit} model={this.props.doc}>
                  <Segment>
                    <AutoField name='name'/>
                    <AutoField name={'date'}/>
                    <SubmitField value='Submit'/>
                    <ErrorsField/>
                  </Segment>
                </AutoForm>
              </Grid.Column>

              <Grid.Column>
                <ListEvents/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
      );
    }
}

/** Require the presence of a Location document in the props object. */
EditEvent.propTypes = {
  doc: PropTypes.object,
  events: PropTypes.array.isRequired,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Location documents.
  const s1 = Meteor.subscribe('Events');
  return {
    doc: Events.findOne(documentId),
    events: Events.find({}).fetch(),
    ready: s1.ready(),
  };
})(EditEvent);

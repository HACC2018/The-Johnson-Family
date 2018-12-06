import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Loader, Segment } from 'semantic-ui-react';
import { TrashBags } from '/imports/api/TrashBags/TrashBags';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import AddBag from '../components/AddBag';
import ListBag from '../components/ListBag';
import * as db from '../../api/Wrapper/Wrapper';
import EditBag from './EditBag';

class SubmitFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.offEdit = this.offEdit.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.state = {
      isEdit: false,
      editBag: {},
    };
  }

  deleteCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: 'Delete failed: ${error.message}' });
    } else {
      Bert.alert({ type: 'success', message: 'Delete succeeded' });
    }
  }

  renderForm() {
    // console.log(this.props.bags.find(bag => this.state.editBag === bag._id));
    if (this.state.isEdit) {
      // this.setState({isEdit: false});
      // this.state.isEdit = false;
      return <EditBag bag={this.props.bags.find(bag => this.state.editBag === bag._id)}/>;
    }
      return <AddBag/>;

  }

  onEdit(bag_id) {
    this.setState(
        {
          isEdit: true,
          editBag: bag_id,
        },
    );
  }

  offEdit() {
    this.setState(
        {
          isEdit: false,
        },
    );
  }

  onDelete(id) {
    TrashBags.remove(id, this.deleteCallback);
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {

    return (
        <div>
          <Grid container divided='vertically'>
            <Grid.Row columns={2}>
              <Grid.Column>
                {this.renderForm()}
              </Grid.Column>
              <Grid.Column>
                <ListBag
                    data={db.getBagLinkedCollections(this.props.bags)}
                    onDelete={this.onDelete}
                    onEdit={this.onEdit}
                    offEdit={this.offEdit}
                    isEdit={this.state.isEdit}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
    );
  }
}

SubmitFormContainer.propTypes = {
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  const s1 = Meteor.subscribe('TrashBags');
  const s2 = Meteor.subscribe('Events');
  const s3 = Meteor.subscribe('Locations');
  const s4 = Meteor.subscribe('Buildings');
  const s5 = Meteor.subscribe('Categories');
  return {
    bags: TrashBags.find({}).fetch(),
    ready:
        s1.ready() &&
        s2.ready() &&
        s3.ready() &&
        s4.ready() &&
        s5.ready(),
  };
})(SubmitFormContainer);

import React from 'react';
import { List, Icon, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';
//import { TrashBags } from '/imports/api/TrashBags/TrashBags';


/** Renders a single row in the List Bag table. See pages/ListBag.jsx. */
class Bag extends React.Component {
  constructor(props) {
    super(props);
    // this.onClick = this.onClick.bind(this);
  }
  //
  // deleteCallback(error) {
  //   if (error) {
  //     Bert.alert({ type: 'danger', message: 'Delete failed: ${error.message}' });
  //   } else {
  //     Bert.alert({ type: 'success', message: 'Delete succeeded' });
  //   }
  // }
  //
  // onClick() {
  //   TrashBags.remove(this.props.datum.bag._id, this.deleteCallback);
  // }
  // onClick() {
  //   this.props.onDelete(this.props.datum.bag._id);
  // }

  render() {
    return (
        <List divided verticalAlign='middle'>
          <List.Item>
            <List.Content>
              <List.Header
                  as='a'>{this.props.datum.event.name}</List.Header>
              <List.Description>{this.props.datum.building.name}, {this.props.datum.bag.weight}, {this.props.datum.bag.volume}</List.Description>
            </List.Content>
            <List.Content floated='right'>
              <Icon name='edit' size='large' color='blue' onClick={() => this.props.onEdit(this.props.datum.bag._id)}/>
              <Icon name='delete' size='large' color='red' onClick={() => this.props.onDelete(this.props.datum.bag._id)}/>
            </List.Content>
          </List.Item>
        </List>
    );
  }
}

/** Require a document to be passed to this component. */
Bag.propTypes = {
  datum: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Bag);

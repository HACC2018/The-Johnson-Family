import React from 'react';
import { List, Icon, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';
import { Bags } from '/imports/api/TrashBags/TrashBags';

/** Renders a single row in the List Bag table. See pages/ListBag.jsx. */
class Bag extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  deleteCallback(error) {
    if(error) {
      Bert.alert({type: 'danger', message: 'Delete failed: ${error.message}' });
    } else {
      Bert.alert({type: 'success', message: 'Delete succeeded' });
    }
  }
  onClick() {
    Bags.remove(this.props.bag._id, this.deleteCallback);
  }

  render() {
    return (
        <List divided verticalAlign='middle'>
          <List.Item>
            <List.Content>
              <List.Header as='a'>{this.props.bag.event_id}</List.Header>
              <List.Description>{this.props.bag.building_id}, {this.props.bag.weight}, {this.props.bag.volume}</List.Description>
            </List.Content>
            <List.Content floated='right'>
              <Link to={`/edit/${this.props.bag._id}`}><Icon name='edit' size='large'/></Link>
              <Icon name='delete' size='large' color='red' basic onClick={this.onClick} />
            </List.Content>
          </List.Item>
        </List>
    );
  }
}

/** Require a document to be passed to this component. */
Bag.propTypes = {
  bag: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Bag);

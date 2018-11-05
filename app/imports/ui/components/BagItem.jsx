import React from 'react';
import { Table, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';
import { Bags } from '/imports/api/bag/bag';

/** Renders a single row in the List Bag table. See pages/ListBag.jsx. */
class BagItem extends React.Component {
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
        <Table.Row>
          <Table.Cell>{this.props.bag.id}</Table.Cell>
          <Table.Cell>{this.props.bag.type}</Table.Cell>
          <Table.Cell>{this.props.bag.weight}</Table.Cell>
          <Table.Cell>{this.props.bag.volume}</Table.Cell>
          <Table.Cell>
            <Link to={`/edit/${this.props.bag._id}`}>Edit</Link>
          </Table.Cell>
          <Table.Cell>
            <Button basic onClick={this.onClick}>Delete</Button>
          </Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
BagItem.propTypes = {
  bag: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(BagItem);

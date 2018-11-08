import React from 'react';
import { List, Icon, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';
import * as db from '../../api/Wrapper/Wrapper';
/** Renders a single row in the List Location table. See pages/ListLocation.jsx. */
class Location extends React.Component {
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
    Locations.remove(this.props.location._id, this.deleteCallback);
  }

  render() {


    return (
        <List divided verticalAlign='middle'>
          <List.Item>
            <List.Content>
              <List.Header as='a'>{this.props.location.name}</List.Header>
              <List.Description>{this.props.location.street}, {this.props.location.city}, {this.props.location.state}, {this.props.location.zip_code}</List.Description>
            </List.Content>
            <List.Content floated='right'>
              <Link to={`/editlocations/${this.props.location._id}`}><Icon name='edit' size='large'/></Link>
              <Icon name='delete' size='large' color='red' basic onClick={this.onClick} />
            </List.Content>
          </List.Item>
        </List>
    );
  }
}

/** Require a document to be passed to this component. */
Location.propTypes = {
  location: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Location);

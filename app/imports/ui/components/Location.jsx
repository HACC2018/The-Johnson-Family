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
              <Icon name='edit' size='large' color='blue' onClick={() => this.props.onDelete(this.props.location._id)}/>
              <Icon name='delete' size='large' color='red' onClick={() => this.props.onDelete(this.props.location._id)}/>
            </List.Content>
          </List.Item>
        </List>
    );
  }
}

/** Require a document to be passed to this component. */
Location.propTypes = {
  locations: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Location);

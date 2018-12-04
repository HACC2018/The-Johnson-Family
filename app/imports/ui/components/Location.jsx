import React from 'react';
import { List, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';
import { Locations } from '/imports/api/Locations/Locations';

/** Renders a single row in the List Location table. See pages/ListLocation.jsx. */
class Location extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  deleteCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: 'Delete failed: ${error.message}' });
    } else {
      Bert.alert({ type: 'success', message: 'Delete succeeded' });
    }
  }

  onClick() {
    Locations.remove(this.props.loc._id, this.deleteCallback);
  }

  render() {


    return (
        <List divided verticalAlign='middle'>
          <List.Item>
            <List.Content>
              {console.log(this.props.loc)}
              <List.Header as='a'>{this.props.loc.name}</List.Header>
              <List.Description>{this.props.loc.street}, {this.props.loc.city}, {this.props.loc.state}, {this.props.loc.zip_code}</List.Description>
            </List.Content>
            <List.Content floated='right'>
              <Link to={`/editlocations/${this.props.loc._id}`}><Icon name='edit' size='large'/></Link>
              <Icon name='delete' size='large' color='red' onClick={this.onClick} />
            </List.Content>
          </List.Item>
        </List>
    );
  }
}

/** Require a document to be passed to this component. */
Location.propTypes = {
  loc: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Location);

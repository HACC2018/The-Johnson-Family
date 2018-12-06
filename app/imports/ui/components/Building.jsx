import React from 'react';
import { List, Icon } from 'semantic-ui-react';
import { Locations } from '/imports/api/Locations/Locations';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';

/** Renders a single row in the List Location table. See pages/ListLocation.jsx. */
class Building extends React.Component {
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
    Locations.remove(this.props.building._id, this.deleteCallback);
  }

  render() {
    return (
        <List divided verticalAlign='middle'>
          <List.Item>
            <List.Content>
              <List.Header
                  as='a'>{this.props.building.name}</List.Header>
               <List.Description>Location: {this.props.locationName}</List.Description>
            </List.Content>
            <List.Content floated='right'>
              <Link to={`/editbuilding/${this.props.building._id}`}><Icon name='edit' size='large'/></Link>
              <Icon name='delete' size='large' color='red' onClick={this.onClick} />
            </List.Content>
          </List.Item>
        </List>
    );
  }
}

/** Require a document to be passed to this component. */
Building.propTypes = {
  building: PropTypes.object.isRequired,
  locationName: PropTypes.string.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Building);

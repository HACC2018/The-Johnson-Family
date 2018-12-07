import React from 'react';
import { List, Icon } from 'semantic-ui-react';
import { Events } from '/imports/api/Events/Events';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';

/** Renders a single row in the List Location table. See pages/ListLocation.jsx. */
class EventItem extends React.Component {
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
    Events.remove(this.props.event._id, this.deleteCallback);
  }

  render() {
    return (
        <List divided verticalAlign='middle'>
          <List.Item>
            <List.Content>
              <List.Header as='a'>{this.props.event.name}</List.Header>
              <List.Description>
                <List.Item>Date: {this.props.event.date.toDateString()}</List.Item>
                <List.Item>Time: {this.props.event.date.toTimeString()}</List.Item>
              </List.Description>
            </List.Content>
            <List.Content floated='right'>
              <Link to={`/editevent/${this.props.event._id}`}><Icon name='edit' size='large'/></Link>
              <Icon name='delete' size='large' color='red' onClick={this.onClick}/>
            </List.Content>
          </List.Item>
        </List>
    );
  }
}

/** Require a document to be passed to this component. */
EventItem.propTypes = {
  event: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(EventItem);

import React from 'react';
import { List, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';
import { Forms } from '/imports/api/Forms/Forms';

/** Renders a single row in the List Bag table. See pages/ListBag.jsx. */
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  deleteCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: 'Delete failed' });
    } else {
      Bert.alert({ type: 'success', message: 'Delete succeeded' });
    }
  }

  onClick() {
    Forms.remove(this.props.form._id, this.deleteCallback);
  }

  render() {
    return (
        <List divided verticalAlign='middle'>
          <List.Item>
            <List.Content>
              <List.Header as='a'>{this.props.form.id}</List.Header>
              <List.Description>
                {this.props.form.id}, {this.props.form.name}, {this.props.form.date}
              </List.Description>
            </List.Content>
            <List.Content floated='right'>
              <Link to={`/edit/${this.props.form._id}`}><Icon name='edit' size='large'/></Link>
              <Icon name='delete' size='large' color='red' basic onClick={this.onClick} />
            </List.Content>
          </List.Item>
        </List>
    );
  }
}

/** Require a document to be passed to this component. */
Form.propTypes = {
  form: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Form);

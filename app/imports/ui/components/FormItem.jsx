import React from 'react';
import { List, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
//import { Bert } from 'meteor/themeteorchef:bert';

/** Renders a single row in the List Bag table. See pages/ListBag.jsx. */
class FormItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <List divided verticalAlign='middle'>
          <List.Item>
            <List.Content>
              <List.Header as='a'>
                {this.props.forms._id}
                </List.Header>
              <List.Description>{this.props.forms.form.date}</List.Description>
            </List.Content>
            <List.Content floated='right'>
              <Icon name='edit' size='large' color='blue' onClick={() => this.props.onEdit(this.props.forms._id)}/>
              <Icon name='delete' size='large' color='red' onClick={() => this.props.onDelete(this.props.forms._id)}/>
            </List.Content>
          </List.Item>
        </List>
    );
  }
}

/** Require a document to be passed to this component. */
FormItem.propTypes = {
  forms: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(FormItem);

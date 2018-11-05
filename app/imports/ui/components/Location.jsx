import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Contacts table. See pages/ListContacts.jsx. */
class Location extends React.Component {
  render() {
    return (
        <Card centered>
          <Card.Content>
            <Card.Header>{this.props.location.name}</Card.Header>
            <Card.Meta>{this.props.location.street} {this.props.location.city} {this.props.location.state} {this.props.location.zip_code}</Card.Meta>
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
Location.propTypes = {
  location: PropTypes.string.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default Location;

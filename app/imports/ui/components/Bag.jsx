import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Bag table. See pages/ListBag.jsx. */
class Bag extends React.Component {
  render() {
    return (
        <Card centered>
          <Card.Content>
            <Card.Header>
              {this.props.bag.id}
            </Card.Header>
            <Card.Meta>
              {this.props.bag.type}
            </Card.Meta>
            <Card.Description>
              {this.props.bag.weight}
            </Card.Description>
            <Card.Description>
              {this.props.bag.volume}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Link to={`/edit/${this.props.bag._id}`}>Edit</Link>
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
Bag.propTypes = {
  bag: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Bag);

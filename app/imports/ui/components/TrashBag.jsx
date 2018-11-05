import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List TrashBag table. See pages/ListBag.jsx. */
class TrashBag extends React.Component {
  render() {
    return (
        <Card centered>
          <Card.Content>
            <Card.Header>
              {this.props.bag.category_id}
            </Card.Header>
            <Card.Description>
              {this.props.bag.weight}
            </Card.Description>
            <Card.Description>
              {this.props.bag.volume}
            </Card.Description>
            <Card.Description>
              {this.props.bag.count}
            </Card.Description>
            <Card.Description>
              {this.props.bag.event_id}
            </Card.Description>
            <Card.Description>
              {this.props.bag.location_id}
            </Card.Description>
            <Card.Description>
              {this.props.bag.building_id}
            </Card.Description>
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
TrashBag.propTypes = {
  bag: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(TrashBag);

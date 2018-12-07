import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, List, Header, Loader } from 'semantic-ui-react';
import { Categories } from '/imports/api/Categories/Categories';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import CategoryItem from '../../ui/components/CategoryItem';
import * as db from '../../api/Wrapper/Wrapper';

/** Renders a table containing all of the Contacts documents. Use <Contact> to render each row. */
class ListCategories extends React.Component {
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {

    return (
        <Container>
          <Header as="h2" textAlign="center">List Categories</Header>
          <List divided verticalAlign='middle'>
            <List.Item>
              {this.props.categories.map((category, index) => <CategoryItem
                  key={index}
                  category={category}
                  parent={db.getParentName(category.parent_id, this.props.categories)}
              />)}
            </List.Item>
          </List>
        </Container>
    );
  }
}

/** Require an array of Contacts documents in the props. */
ListCategories.propTypes = {
  categories: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Contacts documents.
  const s1 = Meteor.subscribe('Categories');
  return {
    categories: Categories.find({}).fetch(),
    ready: s1.ready(),
  };
})(ListCategories);

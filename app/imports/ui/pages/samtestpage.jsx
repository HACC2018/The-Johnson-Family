import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Container, Loader } from 'semantic-ui-react';
import { Locations } from '/imports/api/Locations/Locations';
import { Buildings } from '/imports/api/Buildings/Buildings';
import { Events } from '/imports/api/Events/Events';

// import Location from '/imports/ui/components/Location';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import * as db from '../../api/Wrapper/Wrapper';


/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class samtestpage extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.onClick2 = this.onClick2.bind(this);
    this.onClick3 = this.onClick2.bind(this);
    this.deleteClick = this.deleteClick.bind(this);
  }

  deleteCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Delete failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Delete succeeded' });
    }
  }

  onClick() {
    if (db.addNewLocation('uh', 'paper', 'ha', 'ha')) {
      Bert.alert({ type: 'success', message: 'Insert succeeded'});
    } else {
      Bert.alert({ type: 'danger', message: 'Insert failed'});
    }
  }

  onClick2(){
    if(db.addNewForm("2", 1)){
      console.log(db.getTotalCollectionCount(6));
      Bert.alert({type: 'success', message: 'Insert succeeded'});
    } else {
      Bert.alert({type: 'danger', message: 'Insert failed'});
    }
  }

  onClick3() {
    if (db.addNewForm("TestName1", 1)) {
      Bert.alert({ type: 'success', message: 'Insert succeeded'});
    } else {
      Bert.alert({ type: 'danger', message: 'Insert failed'});
    }
  }

  deleteClick() {
    const id = this.props.building[0]._id;
    Buildings.remove(id, this.deleteCallback);
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }


  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Button basic onClick={this.onClick}>Add TestForm</Button>
          <Button basic onClick={this.onClick2}>Add TestForm</Button>
          {/*<Button basic onClick={this.onClick3}>Add TestLocation3</Button>*/}
          <Button basic onClick={this.deleteClick}>Delete TestForm</Button>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
samtestpage.propTypes = {
  event: PropTypes.array.isRequired,
  location: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Events');
  const subscription2 = Meteor.subscribe('Categories');
  return {
    event: Events.find({}).fetch(),
    location: Events.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready(),
  };
})(samtestpage);

import React from 'react';
// import { Meteor } from 'meteor/meteor';
import { Button, Container, Dropdown, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import * as db from '../../api/Wrapper/Wrapper';
import { Locations } from '../../api/Locations/Locations';
import { Events } from '../../api/Events/Events';
import { Categories } from '../../api/Categories/Categories';
import { Forms } from '../../api/Forms/Forms';
import { Buildings } from '../../api/Buildings/Buildings';
import PropTypes from 'prop-types';



/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class giantestpage extends React.Component {
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
    if (db.addNewBuilding("1", "1")) {
      Bert.alert({ type: 'success', message: 'Insert succeeded'});
    } else {
      Bert.alert({ type: 'danger', message: 'Insert failed'});
    }
  }

  onClick2(){
    if(db.addNewForm("2", 1)){
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
giantestpage.propTypes = {
  location: PropTypes.array.isRequired,
  event: PropTypes.array.isRequired,
  category: PropTypes.array.isRequired,
  form: PropTypes.array.isRequired,
  building: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,

};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Locations');
  const subscription2 = Meteor.subscribe('Events');
  const subscription3 = Meteor.subscribe('Categories');
  const subscription4 = Meteor.subscribe('Forms');
  const subscription5 = Meteor.subscribe('Buildings');
  return {
    location: Locations.find({}).fetch(),
    category: Categories.find({}).fetch(),
    event: Events.find({}).fetch(),
    form: Forms.find({}).fetch(),
    building: Buildings.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready() && subscription3.ready() && subscription4.ready() && subscription5.ready(),
  };
})(giantestpage);

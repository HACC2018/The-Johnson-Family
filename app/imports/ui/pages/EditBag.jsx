import React from 'react';
import { Container, Form, Grid, Header, Segment, Message } from 'semantic-ui-react';
import { TrashBags, TrashBagSchema } from '/imports/api/TrashBags/TrashBags';
import * as db from '../../api/Wrapper/Wrapper';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';

class EditBag extends React.Component {
  constructor(props) {
    super(props);
    this.state = { event: this.props.bag.event_id, building: this.props.bag.building_id, location: this.props.bag.location_id, category: this.props.bag.category_id, form: this.props.bag.form_id, weight: this.props.bag.weight, volume: this.props.bag.volume, count: this.props.bag.count, notes: this.props.bag.notes, accepted: this.props.bag.accepted };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateCallback = this.updateCallback.bind(this);
    //this.handleRef = this.handleRef.bind(this);
  }

  updateCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Edit failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Edit succeeded' });
      window.location = '/#/submitform'
    }
  }

  // handleRef(c)  {
  //   this.inputRef = c;
  // }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
    console.log(this.state);
  }

  handleSubmit() {
    let { event, building, location, category, form, weight, volume, count, notes, accepted} = this.state;
    console.log('state, variables');
    console.log(this.state);
    console.log(this.props.bag._id, event, building, location, category, form, weight, volume, count, notes, accepted);
    // update
    db.editTrashBag( this.props.bag._id, event, building, location, category, form, weight, volume, count, notes, accepted );
    this.updateCallback();
    // this.setState({ event: '', building: '', location: '', category: '', form: 123, weight: '', volume: '', count: '', notes: '', accepted: false });
    // this.inputRef.focus()
    // //this.state.reset(this.setState));
    //this.setState.value = "";
  }

  render() {
    const eventArray = db.getCollection(db.constants.codes.events);
    const buildingArray = db.getCollection(db.constants.codes.buildings);
    const locationArray = db.getCollection(db.constants.codes.locations);
    const categoryArray = db.getCollection(db.constants.codes.categories);
    const eventOptions = eventArray.map( function(event) {
      let obj = {};
      obj.text = event.name;
      obj.value = event._id;
      return obj;
    });
    const buildingOptions = buildingArray.map( function(building) {
      let obj = {};
      obj.text = building.name;
      obj.value = building._id;
      return obj;
    });
    const locationOptions = locationArray.map( function(location) {
      let obj = {};
      obj.text = location.name;
      obj.value = location._id;
      return obj;
    });
    const categoryOptions = categoryArray.map( function(category) {
      let obj = {};
      obj.text = category.name;
      obj.value = category._id;
      return obj;
    });
    //console.log(eventOptions, buildingOptions, locationOptions, categoryOptions);
    // this.state = { event: this.props.bag.event_id, building: this.props.bag.building_id, location: this.props.bag.location_id, category: this.props.bag.category_id, form: this.props.bag.form_id, weight: this.props.bag.weight, volume: this.props.bag.volume, count: this.props.bag.count, notes: this.props.bag.notes, accepted: this.props.bag.accepted };

    return (
        <Container>
          <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
            <Grid.Column>
              <Header as="h2" textAlign="center">
                Edit Bag
              </Header>
              <Form onSubmit={this.handleSubmit}>
                <Segment stacked>
                  <Form.Select
                      label='Event'
                      name={'event'}
                      options={eventOptions}
                      defaultValue={this.props.bag.event_id}
                      onChange={this.handleChange}
                  />
                  <Form.Select
                      label='Building'
                      name={'building'}
                      options={buildingOptions}
                      defaultValue={this.props.bag.building_id}
                      onChange={this.handleChange}
                  />
                  <Form.Select
                      label='Location'
                      name={'location'}
                      options={locationOptions}
                      defaultValue={this.props.bag.location_id}
                      onChange={this.handleChange}
                  />
                  <Form.Select
                      label='Category'
                      name={'category'}
                      options={categoryOptions}
                      defaultValue={this.props.bag.category_id}
                      onChange={this.handleChange}
                  />
                  <Form.Input
                      label="Weight"
                      name="weight"
                      type="weight"
                      defaultValue={this.props.bag.weight}
                      onChange={this.handleChange}
                  />
                  <Form.Input
                      label="Volume"
                      name="volume"
                      type="volume"
                      value={this.props.bag.volume}
                      onChange={this.handleChange}
                  />
                  <Form.Input
                      label="Count"
                      name="count"
                      type="count"
                      defaultValue={this.props.bag.count}
                      onChange={this.handleChange}
                  />
                  <Form.Input
                      label="Notes"
                      name="notes"
                      type="notes"
                      defaultValue={this.props.bag.notes}
                      onChange={this.handleChange}
                  />
                  <Form.Button content="Submit"/>
                </Segment>
              </Form>
            </Grid.Column>
          </Grid>
        </Container>
    );
  }
}

export default EditBag;

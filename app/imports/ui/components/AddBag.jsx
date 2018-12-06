import React from 'react';
import { Container, Form, Grid, Header, Segment, Message } from 'semantic-ui-react';
import { TrashBags, TrashBagSchema } from '/imports/api/TrashBags/TrashBags';
import * as db from '../../api/Wrapper/Wrapper';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';

export default class InputForm extends React.Component {
  /** Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { event: '', building: '', location: '', category: '', form: 123, weight: '', volume: '', count: '', notes: '', accepted: false };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.insertCallback = this.insertCallback.bind(this);
    //this.handleRef = this.handleRef.bind(this);
  }

  insertCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Add failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Add succeeded' });
      //this.state.reset();
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
    let { event, building, location, category, form, weight, volume, count, notes } = this.state;
    db.addNewTrashBag( event, building, location, category, form, weight, volume, count, notes );
    this.insertCallback();
    this.setState({ event: '', building: '', location: '', category: '', form: 123, weight: '', volume: '', count: '', notes: '', accepted: false });
    //this.inputRef.focus()
    //this.state.reset(this.setState));
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
    console.log(eventOptions, buildingOptions, locationOptions, categoryOptions);

    return (
        <Container>
          <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
            <Grid.Column>
              <Header as="h2" textAlign="center">
                Add Bag
              </Header>
              <Form onSubmit={this.handleSubmit}>
                <Segment stacked>
                  <Form.Select
                      label='Event'
                      name={'event'}
                      options={eventOptions}
                      placeholder='Event'
                      onChange={this.handleChange}
                  />
                  <Form.Select
                      label='Building'
                      name={'building'}
                      options={buildingOptions}
                      placeholder='Building'
                      onChange={this.handleChange}
                  />
                  <Form.Select
                      label='Location'
                      name={'location'}
                      options={locationOptions}
                      placeholder='Location'
                      onChange={this.handleChange}
                  />
                  <Form.Select
                      label='Category'
                      name={'category'}
                      options={categoryOptions}
                      placeholder='Category'
                      onChange={this.handleChange}
                  />
                  <Form.Input
                      label="Weight"
                      name="weight"
                      type="weight"
                      value={this.state.weight}
                      onChange={this.handleChange}
                  />
                  <Form.Input
                      label="Volume"
                      name="volume"
                      type="volume"
                      value={this.state.volume}
                      onChange={this.handleChange}
                  />
                  <Form.Input
                      label="Count"
                      name="count"
                      type="count"
                      value={this.state.count}
                      onChange={this.handleChange}
                  />
                  <Form.Input
                      label="Notes"
                      name="notes"
                      type="notes"
                      value={this.state.notes}
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



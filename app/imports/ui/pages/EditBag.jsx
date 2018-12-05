import React from 'react';
import { Container, Form, Grid, Header, Segment, Message } from 'semantic-ui-react';
import { TrashBags, TrashBagSchema } from '/imports/api/TrashBags/TrashBags';
import * as db from '../../api/Wrapper/Wrapper';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';

/** Renders the Page for editing a single document. */
class EditBag extends React.Component {
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
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
                Manage Bags
              </Header>
              <Form ref={(ref) => { this.formRef = ref; }} onSubmit={this.handleSubmit}>
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
                      onChange={this.handleChange}
                  />
                  <Form.Input
                      label="Volume"
                      name="volume"
                      type="volume"
                      onChange={this.handleChange}
                  />
                  <Form.Input
                      label="Count"
                      name="count"
                      type="count"
                      onChange={this.handleChange}
                  />
                  <Form.Input
                      label="Notes"
                      name="notes"
                      type="notes"
                      onChange={this.handleChange}
                  />
                  <Form.Button content=" Submit"/>
                </Segment>
              </Form>
            </Grid.Column>
          </Grid>
        </Container>
    );
  }
}

export default EditBag;

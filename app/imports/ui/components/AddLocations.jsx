import React from 'react';
import { Container, Form, Grid, Header, Segment, Message } from 'semantic-ui-react';
import { Bert } from 'meteor/themeteorchef:bert';
import { Locations, LocationsSchema } from '/imports/api/Locations/Locations';
import { Meteor } from "meteor/meteor";
import * as db from '../../api/Wrapper/Wrapper';

/** A simple static component to render some text for the landing page. */
class AddLocations extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', street: '', city: '', state: '', zip_code: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.insertCallback = this.insertCallback.bind(this);
    //this.handleRef = this.handleRef.bind(this);
  }

  /** Notify the user of the results of the submit. If successful, clear the form. */
  insertCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Add failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Add succeeded' });
    }
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
    console.log(this.state);
  }

  handleSubmit() {
    let { name, street, city, state, zip_code } = this.state;
    db.addNewLocation( name, street, city, state, zip_code );
    this.insertCallback();
    this.setState({ name: '', street: '', city: '', state: '', zip_code: '' });
    //this.inputRef.focus()
    //this.state.reset(this.setState));
    //this.setState.value = "";
  }

  render() {
    return (
        <Container>
          <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
            <Grid.Column>
              <Header as="h2" textAlign="center">Add Locations</Header>
              <Form onSubmit={this.handleSubmit}>
                <Segment stacked>
                  <Form.Input
                      label='Name'
                      name={'name'}
                      type="name"
                      value={this.state.name}
                      onChange={this.handleChange}
                  />
                  <Form.Input
                      label='Street'
                      name={'street'}
                      type="street"
                      value={this.state.street}
                      onChange={this.handleChange}
                  />
                  <Form.Input
                      label='City'
                      name={'city'}
                      type="city"
                      value={this.state.city}
                      onChange={this.handleChange}
                  />
                  <Form.Input
                      label='State'
                      name={'state'}
                      type="state"
                      value={this.state.state}
                      onChange={this.handleChange}
                  />
                  <Form.Input
                      label='Zip Code'
                      name={'zip_code'}
                      type="zip_code"
                      value={this.state.zip_code}
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

export default AddLocations;

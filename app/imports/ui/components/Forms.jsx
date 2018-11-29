import React from 'react';
import { TrashBags, TrashBagSchema } from '/imports/api/TrashBags/TrashBags';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';

import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'

class Forms extends React.Component {
  state = {
    event: '',
    building: '',
    location: '',
    // category: '',
    // weight: '',
    // volume: '',
    // count: '',
    submittedEvent: '',
    submittedBuilding: '',
    submittedLocation: ''
    // submittedCategory: '',
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    const { event, building, location } = this.state

    this.setState({ submittedEvent: event, submittedBuilding: building, submittedLocation: location })
  }

  render() {
    const { event, building, location, submittedEvent, submittedBuilding, submittedLocation } = this.state

    return (
        <div>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Input
                  placeholder='Event'
                  name='event'
                  value={event}
                  onChange={this.handleChange}
              />
              <Form.Input
                  placeholder='Building'
                  name='building'
                  value={building}
                  onChange={this.handleChange}
              />
              <Form.Input
                  placeholder='Location'
                  name='location'
                  value={location}
                  onChange={this.handleChange}
              />
              <Form.Button content='Submit' />
            </Form.Group>
          </Form>
          <strong>onChange:</strong>
          <pre>{JSON.stringify({ event, building, location }, null, 3)}</pre>
          <strong>onSubmit:</strong>
          <pre>{JSON.stringify({ submittedEvent, submittedBuilding, submittedLocation }, null, 3)}</pre>
        </div>
    )
  }
}



export default Forms;

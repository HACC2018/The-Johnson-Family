import React from 'react';
import { Container, Form, Grid, Header, Segment, Message } from 'semantic-ui-react';
import { TrashBags, TrashBagSchema } from '/imports/api/TrashBags/TrashBags';
import * as db from '../../api/Wrapper/Wrapper';


export default class InputForm extends React.Component {
  /** Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { event: '', building: '', location: '', category: '', weight: '', volume: '', count: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  handleSubmit() {
    const { event, building, location, category, weight, volume, count, error } = this.state;
    db.addNewTrashBag( event, building, location, category, weight, volume, count, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        // browserHistory.push('/submitform');
      }
    });
  }

  render() {
    return (
        <Container>
          <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
            <Grid.Column>
              <Header as="h2" textAlign="center">
                Manage Bags
              </Header>
              <Form onSubmit={this.handleSubmit}>
                <Segment stacked>
                  <Form.Input
                      label="Event"
                      name="event"
                      type="event"
                      onChange={this.handleChange}
                  />
                  <Form.Input
                      label="Building"
                      name="building"
                      type="building"
                      onChange={this.handleChange}
                  />
                  <Form.Input
                      label="Location"
                      name="location"
                      type="location"
                      onChange={this.handleChange}
                  />
                  <Form.Input
                      label="Category"
                      name="category"
                      type="category"
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
                  <Form.Button content=" Submit"/>
                </Segment>
              </Form>

              {this.state.error === '' ? (
                  ''
              ) : (
                  <Message
                      error
                      header="not successful"
                      content={this.state.error}
                  />
              )}
            </Grid.Column>
          </Grid>
        </Container>
    );
  }
}

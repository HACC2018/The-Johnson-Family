import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, List } from 'semantic-ui-react';
import FormItem from '/imports/ui/components/FormItem';


/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListForm extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {

    return (
        <Container>
          <Header as="h2" textAlign="center">List Forms</Header>
          <List divided verticalAlign='middle'>
            <List.Item>
              {this.props.forms.map((form, index) => <FormItem key={index} form={form}/>)}
            </List.Item>
          </List>
        </Container>
    );
  }
}

export default ListForm;

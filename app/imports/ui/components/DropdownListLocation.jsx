import React from 'react';
import { Dropdown } from 'semantic-ui-react';

class DropdownListLocation extends React.Component {

  render() {
    return (
        <Dropdown placeholder='Location' selection options={this.props.options}/>
    )
  }
}
export default DropdownListLocation;

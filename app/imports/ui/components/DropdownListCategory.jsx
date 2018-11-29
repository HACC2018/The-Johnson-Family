import React from 'react';
import { Dropdown } from 'semantic-ui-react';

class DropdownListCategory extends React.Component {

  render() {
    return (
        <Dropdown placeholder='Category' selection options={this.props.options}/>
    )
  }
}
export default DropdownListCategory;


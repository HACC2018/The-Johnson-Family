import React from 'react';
import { Dropdown } from 'semantic-ui-react';

class DropdownListBuilding extends React.Component {

  render() {
    return (
        <Dropdown placeholder='Building' selection options={this.props.buildingOptions}/>
    )
  }
}
export default DropdownListBuilding;

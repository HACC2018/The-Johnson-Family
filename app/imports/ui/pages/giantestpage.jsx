import React from 'react';
// import Test from '../components/Test';
import Locations from '/imports/api/Locations/Locations';

const locations = Locations.find({}).fetch();
console.log(locations);
export default class GianTest extends React.Component {
  render() {

    return (
        <div>
          {locations}
        </div>
    );
  }
}

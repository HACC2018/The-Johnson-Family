import React from 'react';

export default class Palette extends React.Component.Component {
  constructor() {
    super();
    this.graph = {
      one: '#ace1af',
      two: '#9ed8a1',
      three: '82c67f',
      four: '3d8c3f',
      five: '024731',
    };
    this.background = '#000000';
    this.text = '#ffffff';
    this.error = 'b00002';
  }
}

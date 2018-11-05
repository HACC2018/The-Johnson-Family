import React from 'react';
import Middle from '../components/Middle';
import Background from '../components/Background';
import ThirdBackground from '../components/ThirdBackground';
import BackgroundBar from '../components/BackgroundBar';
import BackgroundBar2 from '../components/BackgroundBar2';

export default class Landing extends React.Component {

  render() {
    return (
        <div>
          <Middle/>
          <BackgroundBar/>
          <Background/>
          <BackgroundBar2/>
          <ThirdBackground/>
        </div>
    );
  }
}

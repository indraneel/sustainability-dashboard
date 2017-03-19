import React, { Component } from 'react';
import style from './visualization.style.js';
import {RadialChart} from 'react-vis';

class Visualization extends Component {
  render() {
    return (
       <RadialChart
        innerRadius={66}
        radius={93}
        data={[
          {angle: 2},
          {angle: 6},
          {angle: 2},
          {angle: 3},
          {angle: 1}
        ]}
        width={200}
        height={200}
      />
    );
  }
}

export default Visualization;

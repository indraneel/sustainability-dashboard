import React, { Component } from 'react';
import style from './visualization.style.js';
import {RadialChart} from 'react-vis';
import {
  PieChart,
  LineChart,
  BarChart,
  Legend,
  Resizer,
  chartConstants
} from 'lucid-ui';

const palette = chartConstants.PALETTE_6;

class Visualization extends Component {
  render() {
    let {
      type,
      xAxisTitle,
      yAxisTitle,
      data
    } = this.props.visualization;
    switch (type) {
      case 'pie':
        return <PieChart
          xAxisTitle={xAxisTitle}
          yAxisTitle={yAxisTitle}
          data={data}
          palette={palette}/>;
        break;
      case 'line':
        return <Resizer style={{
					flexGrow: 1,
					overflow: 'hidden',
				}}>
          {(width) => (
            <LineChart
              width={width * 0.75}
              height={width * 0.75}
              xAxisTitle={xAxisTitle}
              yAxisTitle={yAxisTitle}
              data={data}
              palette={palette}/>
          )}
        </Resizer>;
      case 'bar':
        return <Resizer style={{
					flexGrow: 1,
					overflow: 'hidden',
				}}>
          {(width) => (
            <BarChart
              width={width * 0.75}
              height={width * 0.75}
              xAxisTitle={xAxisTitle}
              yAxisTitle={yAxisTitle}
              data={data}
              palette={palette}/>
          )}
          </Resizer>;
      default:
        return null
    }

  }
}

export default Visualization;

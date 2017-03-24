import React, { Component } from 'react';
import style from './visualization.style.js';
import BigTextVisualization from './big-text';
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
        return <Resizer style={{
					flexGrow: 1,
					overflow: 'hidden',
				}}>
          {(width) => (
            <PieChart
              width={width}
              height={width}
              xAxisTitle={xAxisTitle}
              yAxisTitle={yAxisTitle}
              data={data}
              palette={palette}/>
          )}
        </Resizer>;
      case 'line':
        return <Resizer style={{
					flexGrow: 1,
					overflow: 'hidden',
				}}>
          {(width) => (
            <LineChart
              width={width}
              height={width}
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
              width={width}
              height={width}
              xAxisTitle={xAxisTitle}
              yAxisTitle={yAxisTitle}
              data={data}
              palette={palette}/>
          )}
          </Resizer>;
        case 'text':
          return <BigTextVisualization data={data}/>
      default:
        return null
    }

  }
}

export default Visualization;

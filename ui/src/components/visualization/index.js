import React, { Component } from 'react';
import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';

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

const palette = chartConstants.PALETTE_MONOCHROME_GOOD_3;

class Visualization extends Component {
  render() {
    let {
      type,
      xAxisField,
      yAxisField,
      data,
      entryFields
    } = this.props.visualization;

    // hack to match stats api endpoint
    if (!entryFields) {
      entryFields = {
        pie: {
          xAxisField: 'x',
          yAxisField: 'y'
        },
        bar: {
          xAxisField: 'x',
          yAxisField: 'y'
        },
        line: {
          xAxisField: 'x',
          yAxisField: 'y'
        }
      };

      if (type === 'line') {
        let newData = data.map((curr, index) => {
          let newObj = {};
          let newX = typeof curr.x === 'string' ?
            new Date(curr.x)
            : curr.x;
          newObj.x = newX;
          newObj.y = Number(curr.y);
          return newObj;
        });
        data = newData;
      } else if (type === 'bar') {

      }
    }

    xAxisField = xAxisField || 'x';
    yAxisField = yAxisField || 'y';

    // another api hack => convert string to Date for line


    switch (type) {
      case 'pie':
        return <Resizer style={{
					flexGrow: 1,
					overflow: 'hidden',
				}}>
          {(width) => (
            <PieChart
              xAxisField={entryFields[type].xAxisField}
              yAxisField={entryFields[type].yAxisField}
              width={width}
              height={width}
              data={data}
              palette={palette}>
              { !isEmpty(data) ?
                <Legend>
                  {map(data, (d, index) => (
                    <Legend.Item
                    key={index}
                    color={palette[index % palette.length]}
                    hasPoint
                    pointKind={1}
                    >
                    {d.x}
                    </Legend.Item>
                  ))}
                </Legend>
                : null
              }
            </PieChart>
          )}
        </Resizer>;
      case 'line':

        return <Resizer style={{
					flexGrow: 1,
					overflow: 'hidden',
				}}>
          {(width) => (
            <LineChart
              xAxisField={entryFields[type].xAxisField}
              yAxisFields={[entryFields[type].yAxisField]}
              width={width}
              height={width}
              xAxisTitle={xAxisField}
              yAxisTitle={yAxisField}
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
              xAxisField={entryFields[type].xAxisField}
              yAxisFields={[entryFields[type].yAxisField]}
              width={width}
              height={width}
              xAxisTitle={xAxisField}
              yAxisTitle={yAxisField}
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

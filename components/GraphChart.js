import React, { Component } from 'react';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import LineChart from 'recharts/lib/chart/LineChart';
import Line from 'recharts/lib/cartesian/Line';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';
import PropTypes from 'prop-types';
import { renderDate } from '../lib/utils.js';

class GraphChart extends Component {
  render() {
    var renderData = this.props.data.map(dataPoint => ({
      time: renderDate(dataPoint.time),
      value: dataPoint.value
    }));
    return (
      <ResponsiveContainer width="99%" height={320}>
        <LineChart data={renderData}>
          <XAxis dataKey="time" interval="preserveStartEnd" />
          <YAxis />
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            dot={false}
            activeDot={{ r: 8 }}
            name={this.props.name}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}

GraphChart.propTypes = {
  data: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired
};

export default GraphChart;

import React from 'react';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import LineChart from 'recharts/lib/chart/LineChart';
import Line from 'recharts/lib/cartesian/Line';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';

const data = [
  { time: '2018-09-26T12:30:05Z', value: 22.5 },
  { time: '2018-09-26T12:31:05Z', value: 23.5 },
  { time: '2018-09-26T12:32:05Z', value: 24.5 },
  { time: '2018-09-26T12:33:05Z', value: 21.5 },
  { time: '2018-09-26T12:34:05Z', value: 15.5 },
  { time: '2018-09-26T12:35:05Z', value: 17.5 },
  { time: '2018-09-26T12:36:05Z', value: 22.5 }
];

function SimpleLineChart() {
  return (
    // 99% per https://github.com/recharts/recharts/issues/172
    <ResponsiveContainer width="99%" height={320}>
      <LineChart data={data}>
        <XAxis dataKey="time" />
        <YAxis />
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
          name="Temperature"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default SimpleLineChart;

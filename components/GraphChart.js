import React from 'react';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import LineChart from 'recharts/lib/chart/LineChart';
import Line from 'recharts/lib/cartesian/Line';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Error from './Error';

const GRAPH_QUERY = gql`
  query GRAPH_QUERY($id: ID!) {
    graph(id: $id) {
      graphData(last: 100, orderBy: time_ASC) {
        time
        value
      }
    }
  }
`;

function GraphChart() {
  // as long as id setting in frontend is not worky
  const tempId = { id: 'cjtal4jvt00680808yr1cp72r' };

  return (
    <Query query={GRAPH_QUERY} variables={tempId}>
      {({ data, error, loading }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <Error error={error} />;
        if (data && data.graph && data.graph.graphData) {
          // success! Prep timestamps...
          data = data.graph.graphData;
          for (var i = 0; i < data.length; i++) {
            data[i].time = new Date(data[i].time).toLocaleString('en-GB');
          }
        }
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
      }}
    </Query>
  );
}

export default GraphChart;

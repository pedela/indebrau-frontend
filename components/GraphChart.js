import React from 'react';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import LineChart from 'recharts/lib/chart/LineChart';
import Line from 'recharts/lib/cartesian/Line';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import Typography from '@material-ui/core/Typography';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Error from './Error';

const GRAPH_QUERY = gql`
  query GRAPH_QUERY($id: ID!) {
    graph(id: $id) {
      graphData(last: 10000, orderBy: time_ASC) {
        time
        value
      }
    }
  }
`;

function GraphChart() {
  // as long as id setting in frontend is not worky
  const tempId = { id: 'cjtal4hjv005m0808e10lbyr2' };
  const idTwo = { id: 'cjteu8hdt01wk08196nvoix9c' };
  const idThree = { id: 'cjtevr4cn037808192d3kp6l2' };
  return (
    <div>
      <Typography variant="h4" gutterBottom component="h2">
        Temperature Fridge
      </Typography>
      <Query query={GRAPH_QUERY} variables={tempId} pollInterval={30000}>
        {({ data, error, loading }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <Error error={error} />;
          if (data && data.graph && data.graph.graphData) {
            // why this render data? because call is executed twice for whatever reason
            // (caching?)...
            var renderDataLength = 100;
            var nthElement = Math.floor(data.graph.graphData.length / renderDataLength);
            if (data.graph.graphData.length < renderDataLength) {
              renderDataLength = data.graph.graphData.length;
              nthElement = 1;
            }
            var renderData = [];
            for (var i = 0; i < renderDataLength - 1; i++) {
              renderData[i] = {
                time: new Date(data.graph.graphData[i * nthElement].time).toLocaleString(
                  'en-GB'
                ),
                value: data.graph.graphData[i * nthElement].value
              };
            }
            renderData[renderDataLength - 1] = {
              time: new Date(
                data.graph.graphData[
                  data.graph.graphData.length - 1
                ].time
              ).toLocaleString('en-GB'),
              value:
                data.graph.graphData[
                  data.graph.graphData.length - 1
                ].value
            };
          }
          return (
            // 99% per https://github.com/recharts/recharts/issues/172
            <ResponsiveContainer width="99%" height={320}>
              <LineChart data={renderData}>
                <XAxis dataKey="time" />
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
                  name="Temperature"
                />
              </LineChart>
            </ResponsiveContainer>
          );
        }}
      </Query>
      <Typography variant="h4" gutterBottom component="h2">
        Tilt iSpindel 2
      </Typography>
      <Query query={GRAPH_QUERY} variables={idTwo} pollInterval={30000}>
        {({ data, error, loading }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <Error error={error} />;
          if (data && data.graph && data.graph.graphData) {
            var renderDataLength = 100;
            var nthElement = Math.floor(data.graph.graphData.length / renderDataLength);
            if (data.graph.graphData.length < renderDataLength) {
              renderDataLength = data.graph.graphData.length;
              nthElement = 1;
            }
            var renderData = [];
            for (var i = 0; i < renderDataLength-1; i++) {
              renderData[i] = {
                time: new Date(data.graph.graphData[i*nthElement].time).toLocaleString(
                  'en-GB'
                ),
                value: data.graph.graphData[i * nthElement].value
              };
            }
            renderData[renderDataLength - 1] = {
              time: new Date(data.graph.graphData[data.graph.graphData.length-1].time).toLocaleString(
                'en-GB'
              ),
              value: data.graph.graphData[data.graph.graphData.length - 1].value};
          }
          return (
            // 99% per https://github.com/recharts/recharts/issues/172
            <ResponsiveContainer width="99%" height={320}>
              <LineChart data={renderData}>
                <XAxis dataKey="time" interval={10} />
                <YAxis />
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="3 3"
                />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#8884d8"
                  dot={false}
                  activeDot={{ r: 8 }}
                  name="Tilt"
                />
              </LineChart>
            </ResponsiveContainer>
          );
        }}
      </Query>
      <Typography variant="h4" gutterBottom component="h2">
        Temperature iSpindel 2
      </Typography>
      <Query query={GRAPH_QUERY} variables={idThree} pollInterval={30000}>
        {({ data, error, loading }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <Error error={error} />;
          if (data && data.graph && data.graph.graphData) {
            var renderDataLength = 100;
            var nthElement = Math.floor(data.graph.graphData.length / renderDataLength);
            if (data.graph.graphData.length < renderDataLength) {
              renderDataLength = data.graph.graphData.length;
              nthElement = 1;
            }
            var renderData = [];
            for (var i = 0; i < renderDataLength - 1; i++) {
              renderData[i] = {
                time: new Date(data.graph.graphData[i * nthElement].time).toLocaleString(
                  'en-GB'
                ),
                value: data.graph.graphData[i * nthElement].value
              };
            }
            renderData[renderDataLength - 1] = {
              time: new Date(
                data.graph.graphData[
                  data.graph.graphData.length - 1
                ].time
              ).toLocaleString('en-GB'),
              value:
                data.graph.graphData[
                  data.graph.graphData.length - 1
                ].value
            };
          }
          return (
            // 99% per https://github.com/recharts/recharts/issues/172
            <ResponsiveContainer width="99%" height={320}>
              <LineChart data={renderData}>
                <XAxis dataKey="time" />
                <YAxis />
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="3 3"
                />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#8884d8"
                  dot={false}
                  activeDot={{ r: 8 }}
                  name="Temperature"
                />
              </LineChart>
            </ResponsiveContainer>
          );
        }}
      </Query>
    </div>
  );
}

export default GraphChart;

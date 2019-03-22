import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Error from './Error';
import GraphChart from './GraphChart';

const ACTIVE_GRAPH_QUERY = gql`
  query ACTIVE_GRAPH_QUERY($sensorNames: [String!]!, $dataPoints: Int!) {
    activeGraphs(sensorNames: $sensorNames, dataPoints: $dataPoints) {
      id
      name
      graphData(orderBy: time_ASC) {
        time
        value
      }
    }
  }
`;

class ActiveGraphs extends Component {
  render() {
    // hardcoded: names of all sensors
    const allSensors = {
      sensorNames: [
        'mashing/mashtun/temperature',
        'sparging/spargingVessel/temperature',
        'boiling/wortVessel/temperature',
        'fermentation/fridge/temperature',
        'fermentation/freezer/temperature',
        'ispindel/iSpindel1/temperature',
        'ispindel/iSpindel1/tilt',
        'ispindel/iSpindel2/temperature',
        'ispindel/iSpindel2/tilt'
      ],
      dataPoints: 100
    };

    return (

      <Query
        query={ACTIVE_GRAPH_QUERY}
        variables={allSensors}
        pollInterval={30000}
      >
        {({ data, error, loading }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <Error error={error} />;
          if (data) {
            return data.activeGraphs.map(activeGraph => (
              <GraphChart data={activeGraph.graphData} key={activeGraph.id} name={activeGraph.name}/>
            ));
          }
        }}
      </Query>
    );
  }
}

export default ActiveGraphs;

import gql from 'graphql-tag';

const ALL_BREWING_PROCESSES_QUERY = gql`
  query BREWING_PROCESSES_QUERY {
    brewingProcesses {
      id
      name
      start
      description
      end
      activeSteps
    }
  }
`;

const ACTIVE_GRAPHS_QUERY = gql`
  query ACTIVE_GRAPHS_QUERY($dataPoints: Int = 50) {
    graphs(dataPoints: $dataPoints, active: true) {
      id
      name
      graphData(orderBy: time_ASC) {
        time
        value
      }
    }
  }
`;

const LATEST_GRAPH_DATA_QUERY = gql`
  query LATEST_GRAPH_DATA_QUERY($id: ID!) {
    graph(id: $id) {
      id
      name
      graphData(last: 1) {
        time
        value
      }
    }
  }
`;

const GRAPH_QUERY = gql`
  query GRAPH_QUERY($id: ID!, $dataPoints: Int = 50) {
    graph(id: $id, dataPoints: $dataPoints) {
      id
      name
      graphData(orderBy: time_ASC) {
        time
        value
      }
    }
  }
`;

const ALL_GRAPHS_QUERY = gql`
  query ALL_GRAPHS_QUERY {
    graphs {
      id
      name
      sensorName
      active
      updateFrequency
      brewingProcess {
        id
      }
    }
  }
`;

const CREATE_BREWING_PROCESS_MUTATION = gql`
  mutation CREATE_BREWING_PROCESS_MUTATION(
    $name: String!
    $startNow: Boolean
    $description: String!
    $brewingProcessDetails: DetailsInput!
  ) {
    createBrewingProcess(
      name: $name
      startNow: $startNow
      description: $description
      brewingProcessDetails: $brewingProcessDetails
    ) {
      id
    }
  }
`;

const DELETE_BREWING_PROCESS = gql`
  mutation DELETE_BREWING_PROCESS($id: ID!) {
    deleteBrewingProcess(id: $id) {
      id
    }
  }
`;

const DELETE_GRAPH_MUTATION = gql`
  mutation DELETE_GRAPH_MUTATION($id: ID!) {
    deleteGraph(id: $id) {
      id
    }
  }
`;

const BREWING_PROCESS_QUERY = gql`
  query BREWING_PROCESS_QUERY($id: ID!) {
    brewingProcess(id: $id) {
      name
      start
      description
      end
      activeSteps
      brewingProcessDetails {
        yeast {
          id
          type
          name
          amountGram
          details
        }
        mashWaterLiter
        spargingWaterLiter
        yieldsLiter
        carbonizationGramPerLiter
        mashInTemperature
        mashSteps {
          id
          durationMinutes
          temperature
          details
        }
        spargingTemperature
        boilingMinutes
        boilHopAdditions {
          id
          minutesAfterBoilStart
          hop {
            id
            type
            name
            amountGram
            details
          }
        }
        dryHopping {
          id
          addedOn
          hop {
            id
            type
            name
            amountGram
            details
          }
        }
        fermentationSteps {
          id
          durationMinutes
          temperature
          details
        }
        originalExtractPlato
        pitchingTemperature
        alcoholPercent
        conditioningDays
      }
      graphs {
        id
        sensorName
      }
    }
  }
`;

const ADVANCE_BREWING_PROCESS_MUTATION = gql`
  mutation ADVANCE_BREWING_PROCESS_MUTATION(
    $id: ID!
    $newActiveSteps: [BrewingStep!]!
  ) {
    advanceBrewingProcess(id: $id, newActiveSteps: $newActiveSteps) {
      activeSteps
    }
  }
`;

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
    }
  }
`;

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      message
    }
  }
`;

const SIGN_UP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $name: String!
    $email: String!
    $password: String!
  ) {
    signup(name: $name, email: $email, password: $password) {
      id
    }
  }
`;

const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      email
      name
      permissions
      participatingBrewingProcesses {
        id
        name
        start
        end
        description
      }
    }
  }
`;

const CREATE_GRAPH_MUTATION = gql`
  mutation CREATE_GRAPH_MUTATION(
    $name: String!
    $sensorName: String!
    $updateFrequency: Int
    $brewingProcessId: ID!
  ) {
    createGraph(
      name: $name
      sensorName: $sensorName
      updateFrequency: $updateFrequency
      brewingProcessId: $brewingProcessId
    ) {
      id
    }
  }
`;

export {
  ALL_BREWING_PROCESSES_QUERY,
  BREWING_PROCESS_QUERY,
  CREATE_BREWING_PROCESS_MUTATION,
  ADVANCE_BREWING_PROCESS_MUTATION,
  DELETE_BREWING_PROCESS,
  ACTIVE_GRAPHS_QUERY,
  ALL_GRAPHS_QUERY,
  GRAPH_QUERY,
  LATEST_GRAPH_DATA_QUERY,
  CREATE_GRAPH_MUTATION,
  DELETE_GRAPH_MUTATION,
  CURRENT_USER_QUERY,
  SIGNIN_MUTATION,
  SIGN_OUT_MUTATION,
  SIGN_UP_MUTATION
};

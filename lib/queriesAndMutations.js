import gql from 'graphql-tag';

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
        bottlesAvailable
        brewingSteps(active: true){
          id
          name
        }
      }
    }
  }
`;

const ALL_BREWING_PROCESSES_QUERY = gql`
  query BREWING_PROCESSES_QUERY {
    brewingProcesses {
      id
      name
      description
      start
      end
      brewingSteps(active: true){
        id
        name
      }
      bottlesAvailable
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
      brewingSteps(active: true) {
        id
        name
        graphs {
          id
          sensorName
        }
      }
    }
  }
`;

const ACTIVE_GRAPHS_QUERY = gql`
  query ACTIVE_GRAPHS_QUERY($dataPoints: Int = 100) {
    graphs(active: true) {
      id
      sensorName
      graphData(dataPoints: $dataPoints) {
        time
        value
      }
    }
  }
`;

const LATEST_GRAPH_DATA_QUERY = gql`
  query LATEST_GRAPH_DATA_QUERY($id: ID!) {
    graph(id: $id) {
      graphData(dataPoints: 1) {
        time
        value
      }
    }
  }
`;

const GRAPH_QUERY = gql`
  query GRAPH_QUERY($id: ID!, $dataPoints: Int = 100) {
    graph(id: $id) {
      id
      sensorName
      graphData(dataPoints: $dataPoints) {
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
      sensorName
      updateFrequency
      brewingStep {
        id
        name
        brewingProcess{ id }
      }
      graphData(dataPoints: 1) {
        time
        value
      }
    }
  }
`;

const CREATE_BREWING_PROCESS_MUTATION = gql`
  mutation CREATE_BREWING_PROCESS_MUTATION(
    $name: String!
    $startNow: Boolean
    $description: String!
  ) {
    createBrewingProcess(
      name: $name
      startNow: $startNow
      description: $description
    ) {
      id
    }
  }
`;

const DELETE_BREWING_PROCESS_MUTATION = gql`
  mutation DELETE_BREWING_PROCESS($brewingProcessId: ID!) {
    deleteBrewingProcess(brewingProcessId: $brewingProcessId) {
      message
    }
  }
`;

const DELETE_GRAPH_MUTATION = gql`
  mutation DELETE_GRAPH_MUTATION($graphId: ID!) {
    deleteGraph(graphId: $graphId) {
      message
    }
  }
`;

const DELETE_MEDIA_STREAM_MUTATION = gql`
  mutation DELETE_MEDIA_STREAM_MUTATION($mediaStreamId: ID!) {
    deleteMediaStream(mediaStreamId: $mediaStreamId) {
      message
    }
  }
`;

const ADVANCE_BREWING_PROCESS_MUTATION = gql`
  mutation ADVANCE_BREWING_PROCESS_MUTATION(
    $brewingProcessId: ID!
  ) {
    advanceBrewingProcess(brewingProcessId: $brewingProcessId) {
      brewingSteps{
        id
      }
    }
  }
`;


const CREATE_GRAPH_MUTATION = gql`
  mutation CREATE_GRAPH_MUTATION(
    $sensorName: String!
    $updateFrequency: Int!
    $brewingProcessId: ID!
    $brewingStepName: StepName!
  ) {
    createGraph(
      sensorName: $sensorName
      updateFrequency: $updateFrequency
      brewingProcessId: $brewingProcessId
      brewingStepName: $brewingStepName
    ) {
      id
    }
  }
`;

const CREATE_MEDIA_STREAM_MUTATION = gql`
  mutation CREATE_MEDIA_STREAM_MUTATION(
    $mediaFilesName: String!
    $overwrite: Boolean!
    $updateFrequency: Int!
    $brewingProcessId: ID!
    $brewingStepName: StepName!
  ) {
    createMediaStream(
      mediaFilesName: $mediaFilesName
      overwrite: $overwrite
      updateFrequency: $updateFrequency
      brewingProcessId: $brewingProcessId
      brewingStepName: $brewingStepName
    ) {
      id
    }
  }
`;

const ALL_MEDIA_STREAMS_QUERY = gql`
  query ALL_MEDIA_STREAMS_QUERY {
    mediaStreams {
      id
      mediaFilesName
      updateFrequency
      brewingStep {
        id
        name
        brewingProcess{ id }
      }
    }
  }
`;

const LATEST_MEDIA_STREAM_FILE_QUERY = gql`
  query LATEST_MEDIA_STREAM_FILE_QUERY($id: ID!) {
    mediaStream(id: $id) {
      id
      mediaFilesName
      mediaFiles(dataPoints: 1) {
        time
        publicIdentifier
      }
    }
  }
`;

const LATEST_SENSOR_DATA_QUERY = gql`
  query LATEST_SENSOR_DATA_QUERY {
    latestSensorData {
      sensorName
      sensorTimeStamp
      sensorValue
    }
  }
`;

export {
  ALL_BREWING_PROCESSES_QUERY,
  BREWING_PROCESS_QUERY,
  CREATE_BREWING_PROCESS_MUTATION,
  ADVANCE_BREWING_PROCESS_MUTATION,
  DELETE_BREWING_PROCESS_MUTATION,
  ACTIVE_GRAPHS_QUERY,
  ALL_GRAPHS_QUERY,
  GRAPH_QUERY,
  LATEST_GRAPH_DATA_QUERY,
  CREATE_GRAPH_MUTATION,
  CREATE_MEDIA_STREAM_MUTATION,
  DELETE_GRAPH_MUTATION,
  CURRENT_USER_QUERY,
  SIGNIN_MUTATION,
  SIGN_OUT_MUTATION,
  SIGN_UP_MUTATION,
  ALL_MEDIA_STREAMS_QUERY,
  LATEST_MEDIA_STREAM_FILE_QUERY,
  DELETE_MEDIA_STREAM_MUTATION,
  LATEST_SENSOR_DATA_QUERY
};

import { gql } from 'react-apollo';

export const newEntryMutation = gql`
  mutation ($anger: Float!,
            $disgust: Float!,
            $fear: Float!,
            $joy: Float!,
            $sadness: Float!,
            $surprise: Float!,
            $inRelativeMode: Boolean,
            $withRelativeValue: Boolean,
            $user: ID) {
    createMoodEntry(
      anger: $anger
      disgust: $disgust
      fear: $fear
      joy: $joy
      sadness: $sadness
      surprise: $surprise
      userId: $user
      inRelativeMode: $inRelativeMode
      withRelativeValue: $withRelativeValue
    ) {
      id
    }
  }
`;

export const queryMoodEntriesInRange = gql`
  query (
      $from: DateTime!,
      $to: DateTime!,
      $user: ID
    ){
    User(id: $user){
      moodEntries(filter: {
          createdAt_gt: $from,
          createdAt_lte: $to,
      }){
        createdAt
        anger
        disgust
        fear
        joy
        sadness
        surprise
      }
    }
  }
`;

export const queryLastMoodEntry = gql`
  query (
      $user: ID
    ){
    User(id: $user){
      moodEntries(last: 1){
        createdAt
        anger
        disgust
        fear
        joy
        sadness
        surprise
      }
    }
  }
`;

export const authenticationMutation = gql`
  mutation ($secret: String!){
    authenticateAnonymousUser(
      secret: $secret,
    ){
      id,
      token
    }
  }
`;

export const sendAnalytics = gql`
  mutation ($type: ActionType!,
            $payload: Json!,
            $sessionId: String!,
            $deviceDetails: Json!,
            $devMode: Boolean!,
            $appVersion: String!)
  {
    createAnalyticEntry(
      type: $type,
      payload: $payload,
      sessionId: $sessionId,
      deviceDetails: $deviceDetails,
      devMode: $devMode,
      appVersion: $appVersion
    ){
      id
    }
  }
`;

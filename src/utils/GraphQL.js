import { gql } from 'react-apollo';

export const newEntryMutation = gql`
  mutation ($anger: Float!,
            $disgust: Float!,
            $fear: Float!,
            $joy: Float!,
            $sadness: Float!,
            $surprise: Float!,
            $user: ID) {
    createMoodEntry(
      anger: $anger
      disgust: $disgust
      fear: $fear
      joy: $joy
      sadness: $sadness
      surprise: $surprise
      userId: $user
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

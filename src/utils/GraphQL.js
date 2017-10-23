import { gql } from 'react-apollo';

export const newEntryMutation = gql`
  mutation ($anger: Float!,
            $disgust: Float!,
            $fear: Float!,
            $joy: Float!,
            $sadness: Float!,
            $surprise: Float!) {
    createMoodEntry(
      anger: $anger
      disgust: $disgust
      fear: $fear
      joy: $joy
      sadness: $sadness
      surprise: $surprise
    ) {
      id
    }
  }
`;

export const queryMoodEntriesInRange = gql`
  query moodEntriesInRange(
    $from: DateTime!,
    $to: DateTime!
  ){
    allMoodEntries (
      filter: {
        createdAt_gt: $from,
        createdAt_lte: $to,
      },
      orderBy: createdAt_ASC
    ) {
      createdAt
      anger
      disgust
      fear
      joy
      sadness
      surprise
    }
  }
`;

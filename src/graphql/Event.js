import { gql } from 'apollo-boost'

export const GET_EVENTS = gql`
  query {
    events {
      id
      name
      category
      duration
      startDatetime
    }
  }
`

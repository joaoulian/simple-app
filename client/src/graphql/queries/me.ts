import gql from 'graphql-tag'

export const ME_QUERY = gql`
  query MeQuery {
    me {
      id
      firstName
      lastName
      email
      birthdate
    }
  }
`

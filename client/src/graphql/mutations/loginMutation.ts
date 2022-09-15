import gql from 'graphql-tag'

export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginRequest!) {
    login(input: $input) {
      accessToken
    }
  }
`

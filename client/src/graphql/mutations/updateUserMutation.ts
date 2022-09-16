import gql from 'graphql-tag'

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($input: UpdateUserRequest!) {
    updateUser(input: $input) {
      success
    }
  }
`

import gql from 'graphql-tag'

export const SIGNUP_MUTATION = gql`
  mutation SignUp($input: SignUpRequest!) {
    signUp(input: $input) {
      id
    }
  }
`

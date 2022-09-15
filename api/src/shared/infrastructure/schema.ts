import { gql } from 'apollo-server';

export const typeDefs = gql`
  input SignUpRequest {
    firstName: String!
    lastName: String!
    birthdate: String!
    email: String!
    password: String!
  }

  type SignUpReponse {
    id: String!
  }

  input LoginRequest {
    email: String!
    password: String!
  }

  type LoginReponse {
    accessToken: String!
  }

  input UpdateUserRequest {
    firstName: String
    lastName: String
    birthdate: String
    email: String
  }

  type UpdateUserResponse {
    success: Boolean!
  }

  type Mutation {
    signUp(input: SignUpRequest!): SignUpReponse
    login(input: LoginRequest!): LoginReponse
    updateUser(input: UpdateUserRequest!): UpdateUserResponse
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    birthdate: String!
    email: String!
  }

  type Query {
    me: User
  }
`;

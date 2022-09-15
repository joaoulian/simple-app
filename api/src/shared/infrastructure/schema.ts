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

  type Mutation {
    signUp(input: SignUpRequest!): SignUpReponse
    login(input: LoginRequest!): LoginReponse
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

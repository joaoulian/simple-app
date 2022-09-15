import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { contextBuilder } from './context';

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, res }) => {
    return { userContext: await contextBuilder.build(req, res) };
  },
  introspection: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const port = process.env.PORT || 3000;

server
  .listen({ port })
  .then(({ url }) => {
    console.log(`🚀  Server  ready at ${url}`);
  })
  .catch((err) => console.error(err));

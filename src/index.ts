
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
import scheme from './scheme'
import LibTask from './lib/LibTask'
import LibUser from './lib/LibUser'

const typeDefs = scheme.getTypeDefs();
/* resolvers */
const resolvers = {
  Query: {
    hello: () => 'Hello world-22',
    async tasks(){
      return await LibTask.get_items();
    },
    async task(parent: any, args: any, context: any, info: any){
      return await LibTask.getTask(args.id);
    },
    userCount:async () => {
      return await LibUser.userCount();
    },
    userValid: async(parent: any, args: any, context: any, info: any) => {
      const user = await LibUser.validUser(args);
      return user;
    },                
  },
  Mutation: {
    addTask: async (parent: any, args: any, context: any) => {
      const ret = await LibTask.addTask(args)
      return ret
    },
    updateTask: async (parent: any, args: any, context: any) => {
      const ret = await LibTask.updateTask(args)
      return ret
    },  
    deleteTask: async (parent: any, args: any, context: any) => {
      const ret = await LibTask.deleteTask(args)
      return ret
    },
    /* user */    
    addUser: async (parent: any, args: any, context: any) => {
      const ret = await LibUser.addUser(args)
      return ret
    },    
  }
};
/* serever-Start */
const server = new ApolloServer({ typeDefs, resolvers });
const app = express();
server.applyMiddleware({ app });
// ENV
//console.log(app.get('env'));
app.listen({ port: 3000 }, () => {
    console.log(`Server ready at http://localhost:3000${server.graphqlPath}`);
  });
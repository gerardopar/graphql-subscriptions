// importing modules
import { GraphQLServer } from 'graphql-yoga'; // * graphql server

// importing demo data
import db from './db';

// importing resolvers
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import User from './resolvers/User';
import Post from './resolvers/Post';
import Comment from './resolvers/Comment';

// ! new server instance
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: {
        Query,
        Mutation,
        User,
        Post,
        Comment
    },
    context: { // global data initialized
        db: db
    }
});

// ! initializes server
server.start(() => {
    console.log('the graphQL server is running!');
});
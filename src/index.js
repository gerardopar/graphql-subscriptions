// importing modules
import { GraphQLServer, PubSub } from 'graphql-yoga'; // * graphql server

// importing demo data
import db from './db';

// importing resolvers
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import Subscription from './resolvers/Subscription';
import User from './resolvers/User';
import Post from './resolvers/Post';
import Comment from './resolvers/Comment';


const pubsub = new PubSub();

// ! new server instance
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: {
        Query,
        Mutation,
        Subscription,
        User,
        Post,
        Comment
    },
    context: { // global data initialized
        db: db,
        pubsub: pubsub
    }
});

// ! initializes server
server.start(() => {
    console.log('the graphQL server is running!');
});
import { GraphQLServer } from 'graphql-yoga';

// Type definitions (schema)
const typeDefs = `
    type Query {
        hello: String!
        name: String!
        location: String!
        bio: String!
    }
`;

// resolvers
const resolvers = {
    Query: {
        hello(){
            return 'This is my first query!'
        },
        name(){
            return 'Gerardo Paredes'
        },
        location(){
            return 'Los Angeles'
        },
        bio(){
            return 'I love to code!'
        }
    }
};

// new server instance
const server = new GraphQLServer({
    typeDefs,
    resolvers
});

// initializes server
server.start(() => {
    console.log('the graphQL server is running!');
})
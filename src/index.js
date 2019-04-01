import { GraphQLServer } from 'graphql-yoga';

// * Type & Custom Type definitions (schema)
// * Optional Arguments
const typeDefs = `
    type Query {
        greeting(name: String, position: String): String!
        post: Post!
        me: User!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Int!
    }

`;

// * Resolvers
const resolvers = {
    Query: {
        greeting(parent, args, ctx, info){
            if(args.name && args.position) {
                return (`Hello ${args.name} is a ${args.position}`);
            }
            else {
                return ('Hello');
            }
        },

        me(){
            return ({
                id: 'gp12345678',
                name: 'Gerardo Paredes',
                email: 'gerardparedes23@gmail.com',
                age: 25
            });
        },

        post(){
            return ({
                id: 'abc123',
                title: 'Some Title',
                body: 'Some Body',
                published: 2019
            });
        }
    }
};

// ! new server instance
const server = new GraphQLServer({
    typeDefs,
    resolvers
});

// ! initializes server
server.start(() => {
    console.log('the graphQL server is running!');
});
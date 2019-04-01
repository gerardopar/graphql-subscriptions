import { GraphQLServer } from 'graphql-yoga';

// * Type & Custom Type definitions (schema)
// * Optional Arguments
const typeDefs = `
    type Query {
        add(a: Float,b: Float ): Float!
        greeting(name: String, position: String): String!
    }
`;

// * Resolvers
const resolvers = {
    Query: {
        add(parent, args, ctx, info){
            return (args.a * args.b);
        },

        greeting(parent, args, ctx, info){
            if(args.name && args.position) {
                return (`Hello ${args.name} is a ${args.position}`);
            }
            else {
                return ('Hello');
            }
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
import { GraphQLServer } from 'graphql-yoga';

// * Type & Custom Type definitions (schema)
// * Optional Arguments
const typeDefs = `
    type Query {
        add(numbers: [Float!]! ): Float!
        grades: [Int!]!
    }

`;

// * Resolvers
const resolvers = {
    Query: {
        add(parent, args, ctx, info){
            if(args.numbers.length === 0) {
                return (0);
            } 

            return args.numbers.reduce((accumulator, currentValue) => {
                return (accumulator + currentValue);
            });
            
        },
        
        grades(parent, args, ctx, info){
            return [99, 88, 100];
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
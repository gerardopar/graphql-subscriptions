import { GraphQLServer } from 'graphql-yoga';

//Type & Custom Type definitions (schema)
const typeDefs = `
    type Query {
        me: User!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }
`;

// resolvers
const resolvers = {
    Query: {
        me(){
            return {
                id: 'gp12345678',
                name: 'Gerardo Paredes',
                email: 'gerardparedes23@gmail.com',
                age: 25
            }
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
});
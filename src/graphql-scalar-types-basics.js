import { GraphQLServer } from 'graphql-yoga';

// Type definitions (schema)
const typeDefs = `
    type Query {
        id: ID!
        name: String!
        age: Int!
        employed: Boolean
        gpa: Float

        title: String!
        price: Float!
        releaseYear: Int
        rating: Float
        inStock: Boolean!
    }
`;

// resolvers
const resolvers = {
    Query: {
        id(){
            return ('gp12345678');
        },
        name(){
            return ('Gerardo Paredes');
        },
        age(){
            return (25);
        },
        employed(){
            return (null);
        },
        gpa(){
            return (2.75);
        },

        title(){
            return ('The Avengers EndGame')
        },
        price(){
            return ('12.50');
        },
        releaseYear(){
            return (2019);
        },
        rating(){
            return (10.00);
        },
        inStock(){
            return (false);
        },
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
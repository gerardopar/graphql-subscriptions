import { GraphQLServer } from 'graphql-yoga';

// Demo users data
const users = [{
        id: '1',
        name: 'johnDoe',
        email: 'johndoe@example.com',
        age: 100
    }, 
    {
        id: '2',
        name: 'janeDoe',
        email: 'janedoe@example.com',
        age: 100
    }];

// Demo posts data
const posts = [{
        id: '1',
        title: 'Top front-end framework?',
        body: 'React.JS is Awesome!',
        published: true
    },
    {
        id: '2',
        title: 'Favorite Programming Language?',
        body: 'Javascript :D!!',
        published: false
    },
    {
        id: '3',
        title: 'GraphQL?',
        body: 'Work in Progress....',
        published: true
    }]

// * Type & Custom Type definitions (schema)
// * Optional Arguments
const typeDefs = `
    type Query { 
        users(query: String): [User!]!  
        posts(query: String): [Post!]!     
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
        published: Boolean!
    }

`;

// * Resolvers
const resolvers = {
    Query: {
        posts(parent, args, ctx, info){
            if(!args.query) {
                return posts;
            }
            
            return posts.filter((post) => {
                const isTitleMatch = post.title.toLocaleLowerCase().includes(args.query.toLocaleLowerCase());
                const isBodyMatch =  post.body.toLowerCase().includes(args.query.toLowerCase());
                return isTitleMatch || isBodyMatch;
            });
        },
        
        users(parent, args, ctx, info){
            if(!args.query) {
                return users;
            }
            
            return users.filter((user) => {
                return user.name.toLowerCase().includes(args.query.toLowerCase());
            });
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
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
        published: true,
        author: '1',
        comments: []
    },
    {
        id: '2',
        title: 'Favorite Programming Language?',
        body: 'Javascript :D!!',
        published: false,
        author: '1',
        comments: []
    },
    {
        id: '3',
        title: 'GraphQL?',
        body: 'Work in Progress....',
        published: true,
        author: '2',
        comments: []
    }];

// Demo comments data
const comments = [{
        id: '1',
        text: 'first comment',
        author: '1',
        post: '1'
    },
    {
        id: '2',
        text: 'second comment',
        author: '1',
        post: '1'
    },
    {
        id: '3',
        text: 'third comment',
        author: '2',
        post: '2'
    },
    {
        id: '4',
        text: 'fourth comment',
        author: '2',
        post: '3'
    }];

// * Type & Custom Type definitions (schema)
// * Optional Arguments
const typeDefs = `
    type Query { 
        users(query: String): [User!]!  
        posts(query: String): [Post!]!     
        post: Post!
        me: User!
        comments: [Comment!]!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!]!
    }

    type Comment {
        id: ID!
        text: String!
        author: User!
        post: Post!
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
        },

        comments(){
            return [...comments];
        }
    },
    Post: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author;
            });
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => {
                return comment.id === parent.id;
            });
        }
    },
    User: {
        posts(parent, args, ctx, info) {
            return posts.filter((post) => {
                return post.author === parent.id;
            });
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => {
                return comment.author === parent.id;
            });
        }
    },
    Comment: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author;
            });
        },
        post(parent, args, ctx, info) {
            return posts.find((post) => {
                return post.author === parent.id;
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
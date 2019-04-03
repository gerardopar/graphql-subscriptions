import { GraphQLServer } from 'graphql-yoga';
import uuidv4 from 'uuid/v4';

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
    },
    {
        id: '2',
        title: 'Favorite Programming Language?',
        body: 'Javascript :D!!',
        published: false,
        author: '1',
    },
    {
        id: '3',
        title: 'GraphQL?',
        body: 'Work in Progress....',
        published: true,
        author: '2',
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
        comments: [Comment!]!  
        me: User!
        post: Post!
    }

    type Mutation {
        createUser(data: CreateUserInput!) : User!
        createPost(data: CreatePostInput!) : Post!
        createComment(data: CreateCommentInput!) : Comment!
    }

    input CreateUserInput {
        name: String!
        email: String!
        age: Int!
    }

    input CreatePostInput {
        title: String!
        body: String!
        published: Boolean!
        author: ID!
    }

    input CreateCommentInput {
        text: String!
        author: ID!
        post: ID!
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
        users(parent, args, ctx, info) {
            if (!args.query) {
                return users;
            }

            return users.filter((user) => {
                return user.name.toLowerCase().includes(args.query.toLowerCase());
            });
        },
        posts(parent, args, ctx, info) {
            if (!args.query) {
                return posts;
            }

            return posts.filter((post) => {
                const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase());
                const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase());
                return isTitleMatch || isBodyMatch;
            })
        },
        comments(parent, args, ctx, info) {
            return comments;
        },
        me() {
            return {
                id: '123098',
                name: 'Mike',
                email: 'mike@example.com'
            };
        },
        post() {
            return {
                id: '092',
                title: 'GraphQL 101',
                body: '',
                published: false
            };
        }
    },
    Mutation: {
        createUser(parent, args, ctx, info) {
            const emailTaken = users.some((user) => user.email === args.data.email);

            if (emailTaken) {
                throw new Error('Email taken');
            }
            
            // const user = {
            //     id: uuidv4(),
            //     name: args.name,
            //     email: args.email,
            //     age: args.age
            // };

            const user = {
                id: uuidv4(),
                ...args.data
            };

            users.push(user);

            return user;
        },
        createPost(parent, args, ctx, info) {
            const userExists = users.some((user) => user.id === args.data.author);

            if (!userExists) {
                throw new Error('User not found');
            }

            // const post = {
            //     id: uuidv4(),
            //     title: args.title,
            //     body: args.body,
            //     published: args.published,
            //     author: args.author
            // };

            const post = {
                id: uuidv4(),
                ...args.data
            };

            posts.push(post);

            return post;
        },
        createComment(parent, args, ctx, info){
            const userExists = users.some((user) => user.id === args.data.author);
            const postExists = posts.some((post) => post.id === args.data.post && post.published);

            if (!userExists || !postExists) {
                throw new Error('Unable to find user and post');
            }

            // const comment = {
            //     id: uuidv4(),
            //     text: args.text,
            //     author: args.author,
            //     post: args.post
            // };

            const comment = {
                id: uuidv4(),
                ...args.data
            };

            comments.push(comment);

            return comment;
        }
    },
    Post: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author;
            })
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => {
                return comment.post === parent.id;
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
                return post.id === parent.post;
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
    }
}

// ! new server instance
const server = new GraphQLServer({
    typeDefs,
    resolvers
});

// ! initializes server
server.start(() => {
    console.log('the graphQL server is running!');
});
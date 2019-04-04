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

const db = {
    users,
    posts,
    comments
};

export { db as default };
import uuidv4 from 'uuid/v4'; // * uuid 

const Mutation = {
    // # user mutations 
    createUser(parent, args, { db }, info) {
        const emailTaken = db.users.some((user) => user.email === args.data.email);

        if (emailTaken) {
            throw new Error('Email taken');
        }
        
        const user = {
            id: uuidv4(),
            ...args.data
        };

        db.users.push(user);

        return user;
    },
    deleteUser(parent, args, { db }, info){
        const userIndex = db.users.findIndex((user) => (user.id === args.id)); // find user index

        if(userIndex === -1) {
            throw new Error('User not found'); // if the user does not exist throw an error
        }

        const deletedUsers = db.users.splice(userIndex, 1); // remove the user from the users array

        db.posts = db.posts.filter((post) => {
            const match = post.author === args.id; // filter posts that contain the deletedUser as the author

            if(match) { // if the post.author matches the comment.author
                db.comments = db.comments.filter((comment) => (comment.post !== post.id)); // filter the comments
            }

            return !match;
        });

        db.comments = db.comments.filter((comment) => comment.author !== args.id); // filter the comments

        return deletedUsers[0]; 
    },

    // # post mutations 
    createPost(parent, args, { db }, info) {
        const userExists = db.users.some((user) => user.id === args.data.author);

        if (!userExists) {
            throw new Error('User not found');
        }

        const post = {
            id: uuidv4(),
            ...args.data
        };

        db.posts.push(post);

        return post;
    },
    deletePost(parent, args, { db }, info) {
        const postIndex = db.posts.findIndex((post) => (post.id === args.id)); // find post index

        if(postIndex === -1) {
            throw new Error('Post not found'); // if the post does not exist throw an error
        }

        const deletedPost = db.posts.splice(postIndex, 1); // remove the post from the users array

        db.comments = db.comments.filter((comment) => comment.post !== args.id); // filter the comments

        return deletedPost[0]; // return the deleted post
    },
    
    // # comment mutations 
    createComment(parent, args, { db }, info){
        const userExists = db.users.some((user) => user.id === args.data.author);
        const postExists = db.posts.some((post) => post.id === args.data.post && post.published);

        if (!userExists || !postExists) {
            throw new Error('Unable to find user and post');
        }

        const comment = {
            id: uuidv4(),
            ...args.data
        };

        db.comments.push(comment);

        return comment;
    },
    deleteComment(parent, args, { db }, info) {
        const commentIndex = db.comments.findIndex((comment) => (comment.id === args.id)); // find comment index

        if(commentIndex === -1) {
            throw new Error('Comment not found'); // if the comment does not exist throw an error
        }

        const deletedComment = db.comments.splice(commentIndex, 1); // remove the comment from the users array

        db.comments = db.comments.filter((comment) => comment.id !== args.id); // filter the comments

        return deletedComment[0]; // return the deleted comment
    }
};

export { Mutation as default };
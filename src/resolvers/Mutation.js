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
    updateUser(parent, args, { db }, info){
        const { id, data } = args;
        const user = db.users.find((user) => (user.id === id)); // find the user to update

        if(!user) {
            throw new Error('User not found'); // check if the user exists
        }

        if(typeof data.email === 'string') { // check if the email is a string
            const emailTaken = db.users.some((user) => (user.email === data.email)); // check if the email doesnt exist

            if(emailTaken) {
                throw new Error('Email taken'); // if the email already exists throw an error
            }

            user.email = data.email; // update the user email
        }

        if(typeof data.name === 'string') { // check if the name is a string
            user.name = data.name; // update the user name
        }

        if(typeof data.age !== undefined) { // if the age is not undefined
            user.age = data.age; // update the user age
        }

        return user; // return the updated user
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
    updatePost(parent, args, { db }, info) {
        const { id, data } = args;
        const post = db.posts.find((post) => (post.id === id)); // find the post to update

        if(!post) {
            throw new Error('Post not found'); // check if the post exists
        }

        if(typeof data.title === 'string') { // check if the title is a string
            post.title = data.title; // update the post title
        }

        if(typeof data.body === 'string') { // check if the body is a string
            post.body = data.body; // update the post body
        }

        if(typeof data.published === 'boolean') { // check if published is a boolean
            post.published = data.published; // update the post published
        }

        return post;
    },
    
    // # comment mutations 
    createComment(parent, args, { db, pubsub }, info){
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

        pubsub.publish(`comment ${args.data.post}`, { comment: comment });

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
    },
    updateComment(parent, args, { db }, info) {
        const { id, data } = args;
        const comment = db.comments.find((comment) => (comment.id === id)); // find the comment to update

        if(!comment) {
            throw new Error('Comment not found'); // check if the comment exists
        }

        if(typeof data.text === 'string') { // check if the text is a string
            comment.text = data.text; // update the comment name
        }

        return comment;
    }
};

export { Mutation as default };
const Subscription = {
    count: {
        subscribe(parent, args, { pubsub }, info) {
            let count = 0;

            setInterval(() => {
                count++;
                pubsub.publish('count', {
                    count
                });
            }, 1000);

            return pubsub.asyncIterator('count');
        }
    },
    comment: {
        subscribe(parent, { postId }, { db }, info) {
            const post = db.post.find((post) => (post.id === postId && post.published === true));

            if(!post) {
                throw new Error('Post not found!');
            }

            return pubsub.asyncIterator(`comment ${postId}`);
        }
    }
};

export { Subscription as default };
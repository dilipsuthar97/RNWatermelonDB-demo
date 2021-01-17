// --------------- ASSETS ---------------
import { database } from '../db';

const posts = database.collections.get('posts');

export default {
    observePosts: () => posts.query().observe(),
    createPost: async ({ title, body }) => {
        await database.action(async () => {
            await posts.create((post) => {
                post.title = title;
                post.body = body;
            });
        });
    },
    deleteAll: async () => {
        await database.action(async () => {
            await posts.query().destroyAllPermanently();
        });
    },
};

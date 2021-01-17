// --------------- LIBRARIES ---------------
import { appSchema, tableSchema } from '@nozbe/watermelondb';

// --------------- TABLE SCHEMA ---------------
export default appSchema({
    version: 8,
    tables: [
        tableSchema({
            name: 'posts',
            columns: [
                { name: 'title', type: 'string' },
                { name: 'body', type: 'string' },
                { name: 'created_at', type: 'number' },
                { name: 'updated_at', type: 'number' },
            ],
        }),
        tableSchema({
            name: 'comments',
            columns: [
                { name: 'body', type: 'string' },
                { name: 'author_name', type: 'string' },
                { name: 'post_id', type: 'string', isIndexed: true },
                { name: 'is_nasty', type: 'boolean' },
                { name: 'created_at', type: 'number' },
                { name: 'updated_at', type: 'number' },
            ],
        }),
    ],
});

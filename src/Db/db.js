// --------------- LIBRARIES ---------------
import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

// --------------- SCHEMA & MODELS ---------------
import schema from './Schema';
import Post from './Model/Post';
import Comment from './Model/Comment';

// --------------- DATABASE ---------------
const adapter = new SQLiteAdapter({
    dbName: 'WatermelonDemo',
    schema,
});

const database = new Database({
    adapter,
    modelClasses: [Post, Comment],
    actionsEnabled: true,
});

export { database };

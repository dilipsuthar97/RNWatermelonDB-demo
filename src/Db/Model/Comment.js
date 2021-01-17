// --------------- LIBRARIES ---------------
import { Model } from '@nozbe/watermelondb';
import {
    field,
    relation,
    action,
    readonly,
    date,
} from '@nozbe/watermelondb/decorators';

// --------------- MODEL ---------------
export default class Comment extends Model {
    static table = 'comments';

    static associations = {
        posts: { type: 'belongs_to', key: 'post_id' },
    };

    @field('body') body;
    @field('is_nasty') isNasty;
    @field('post_id') postId;
    @relation('posts', 'post_id') post;
    @readonly @date('created_at') createdAt;
    @readonly @date('updated_at') updatedAt;

    // Actions ---------------
    @action async deleteComment() {
        return await Promise.all([
            this.markAsDeleted(),
            this.destroyPermanently(),
        ]);
    }
}

// --------------- LIBRARIES ---------------
import React, { useState } from 'react';
import { Text, TouchableOpacity, Image, StyleSheet, View } from 'react-native';
import withObservables from '@nozbe/with-observables';
import moment from 'moment';

// --------------- COMPONENT - Post ---------------
const ItemPost = ({
    post,
    commentCount,
    comments,
    onPress,
    onPressNewComment,
}) => {
    const [expanded, setExpanded] = useState(false);

    const onPressDelete = async () => {
        await post.deletePost();
    };

    return (
        <TouchableOpacity
            style={styles.wrapper}
            delayPressIn={0}
            onPress={onPress}
            activeOpacity={0.5}>
            <View style={styles.contentWrapper}>
                <Text style={styles.title} numberOfLines={1}>
                    {post.title}
                </Text>
                <Text style={styles.body}>{post.body}</Text>
                <Text style={styles.date}>
                    {moment(post.createdAt).format('ddd, Do MMM YY')}
                </Text>
            </View>
            <View style={styles.divider} />
            <TouchableOpacity
                activeOpacity={0.5}
                delayPressIn={0}
                onPress={() => setExpanded(!expanded)}
                style={styles.footerWrapper}>
                <View style={styles.commentCountWrapper}>
                    <Image
                        style={styles.commentCountIcon}
                        source={require('../Assets/ic_comments.png')}
                        resizeMode='contain'
                    />
                    <Text style={styles.commentCountLabel}>
                        {commentCount}{' '}
                        {commentCount > 1 ? 'Comments' : 'Comment'}
                    </Text>
                </View>
                <TouchableOpacity
                    hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
                    onPress={onPressNewComment}>
                    <Image
                        style={styles.addCommentIcon}
                        source={require('../Assets/ic_add_comment.png')}
                        resizeMode='contain'
                    />
                </TouchableOpacity>
            </TouchableOpacity>
            {/* Render all comments here */}
            {expanded &&
                comments.map((c) => <ItemCommentLive key={c.id} comment={c} />)}
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={onPressDelete}
                hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                <Image
                    style={styles.deleteIcon}
                    source={require('../Assets/ic_delete.png')}
                    resizeMode='contain'
                />
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

// --------------- COMPONENT - Comment ---------------
const ItemComment = ({ comment }) => {
    const onPressDeleteComment = async () => {
        await comment.deleteComment();
    };

    return (
        <View
            style={{
                paddingHorizontal: 18,
                paddingBottom: 12,
            }}>
            <View style={styles.commentTitleWrapper}>
                <Text style={styles.commentUser}>Username</Text>
                <Text style={styles.commentDate}>
                    {moment(comment.createdAt).format('ddd, Do MMM YY')}
                </Text>
            </View>
            <Text style={styles.commentBody}>{comment.body}</Text>
            <TouchableOpacity
                style={[styles.deleteButton, { right: 12 }]}
                onPress={onPressDeleteComment}
                hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                <Image
                    style={styles.deleteIcon}
                    source={require('../Assets/ic_delete.png')}
                    resizeMode='contain'
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOpacity: 0.12,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 5,
        marginHorizontal: 16,
        marginBottom: 12,
        borderRadius: 6,
        borderLeftWidth: 3,
        borderLeftColor: '#6200EA',
    },
    contentWrapper: {
        padding: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    body: {
        fontSize: 14,
        color: 'grey',
        lineHeight: 18,
    },
    deleteButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    deleteIcon: {
        width: 14,
        height: 14,
    },
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
    footerWrapper: {
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    commentCountWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    commentCountLabel: {
        fontSize: 14,
        color: 'grey',
        marginLeft: 8,
    },
    commentCountIcon: {
        width: 14,
        height: 14,
        tintColor: 'grey',
    },
    addCommentIcon: {
        width: 18,
        height: 18,
        tintColor: 'black',
    },
    date: {
        fontSize: 12,
        color: 'grey',
        marginTop: 8,
        alignSelf: 'flex-end',
    },
    commentTitleWrapper: {
        flexDirection: 'row',
    },
    commentUser: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    commentDate: {
        fontSize: 16,
        color: 'grey',
        marginLeft: 8,
    },
    commentBody: {
        fontSize: 14,
        color: 'grey',
    },
});

// --------------- OBSERVES ---------------
const ItemCommentLive = withObservables(['comment'], ({ comment }) => ({
    comment: comment.observe(),
}))(ItemComment);

const ItemPostLive = withObservables(['post'], ({ post }) => ({
    post: post.observe(),
    commentCount: post.comments.observeCount(),
    comments: post.comments.observe(),
}))(ItemPost);

export default ItemPostLive;

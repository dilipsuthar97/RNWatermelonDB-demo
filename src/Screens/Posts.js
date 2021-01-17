// --------------- LIBRARIES ---------------
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Keyboard,
    TextInput,
    Image,
    Platform,
} from 'react-native';
import withObservables from '@nozbe/with-observables';
import {
    SafeAreaView,
    SafeAreaInsetsContext,
} from 'react-native-safe-area-context';

// --------------- ASSETS ---------------
import { PostDAO } from '../Db';
import ItemPost from '../Components/ItemPost';
import { Faker } from '../Helpers';

// --------------- SCREEN ---------------
const Posts = ({ navigation, posts }) => {
    const [comment, setComment] = useState('');
    const [isAddComment, setAddComment] = useState(false);
    const [keyboardOffset, setKeyboardOffset] = useState(0);
    const [selectedPost, setSelectedPost] = useState(null);

    // --------------- LIFECYCLE ---------------
    useEffect(() => {
        const addDummyPosta = async () => {
            await PostDAO.deleteAll();
            await Promise.all(
                Faker.getRandomPosts().map((p) => PostDAO.createPost(p)),
            );
        };

        // Add dummy posts
        addDummyPosta();

        Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
        Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

        // Cleanup function
        return () => {
            Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
            Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
        };
    }, []);

    // --------------- METHODS ---------------
    const _keyboardDidShow = (e) => {
        setKeyboardOffset(e.endCoordinates.height);
    };

    const _keyboardDidHide = (e) => {
        setAddComment(false);
        setKeyboardOffset(0);
    };

    const onPressAdd = () => {
        navigation.navigate('Create', { type: 'create' });
    };

    const onPressPost = (post) => {
        navigation.navigate('Create', { post });
    };

    const onPressNewComment = (post) => {
        setAddComment(!isAddComment);
        setSelectedPost(post);
    };

    const onPressAddComment = async () => {
        await selectedPost.addComment(comment);
        setAddComment(false);
        setKeyboardOffset(0);
        setComment('');
    };

    // --------------- UI METHODS ---------------
    const _renderItem = ({ item, index }) => {
        return (
            <ItemPost
                post={item}
                onPress={() => onPressPost(item)}
                onPressNewComment={() => onPressNewComment(item)}
            />
        );
    };

    const _emptyComponent = () => {
        return (
            <View style={styles.emptyWrapper}>
                <Text>No posts available!</Text>
            </View>
        );
    };

    const renderAddCommentUI = (insetBottom) => {
        return (
            <View
                style={[
                    styles.addCommentWrapper,
                    {
                        marginBottom: isAddComment
                            ? Platform.OS == 'ios'
                                ? keyboardOffset
                                : 0
                            : insetBottom,
                    },
                ]}>
                <TextInput
                    style={styles.input}
                    value={comment}
                    onChangeText={(text) => setComment(text)}
                    placeholder='Add comment'
                    placeholderTextColor='grey'
                    autoFocus={true}
                    returnKeyLabel='Add'
                    returnKeyType='done'
                    onSubmitEditing={onPressAddComment}
                />
                <TouchableOpacity
                    onPress={onPressAddComment}
                    activeOpacity={0.5}
                    delayPressIn={0}>
                    <Image
                        style={styles.addCommentIcon}
                        source={require('../Assets/ic_send.png')}
                        resizeMode='contain'
                    />
                </TouchableOpacity>
            </View>
        );
    };

    // --------------- RENDER ---------------
    return (
        <SafeAreaInsetsContext.Consumer>
            {(insets) => (
                <SafeAreaView style={styles.container} edges={['bottom']}>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Posts</Text>
                        <TouchableOpacity
                            delayPressIn={0}
                            onPress={onPressAdd}
                            activeOpacity={0.5}
                            style={styles.addButton}>
                            <Text style={styles.addButtonLabel}>+ Add</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={posts}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={_renderItem}
                        contentContainerStyle={{
                            paddingTop: 12,
                            paddingBottom: 12,
                        }}
                        ListEmptyComponent={_emptyComponent}
                    />
                    {isAddComment && renderAddCommentUI(insets.bottom)}
                </SafeAreaView>
            )}
        </SafeAreaInsetsContext.Consumer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        alignItems: 'center',
        flexDirection: 'row',
        padding: 16,
    },
    addButton: {
        borderColor: '#6200EA',
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 6,
        borderWidth: 1,
    },
    addButtonLabel: {
        fontSize: 14,
    },
    headerTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        flex: 1,
    },
    emptyWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 22,
    },
    addCommentWrapper: {
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#6200EA',
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOpacity: 0.12,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 5,
    },
    input: {
        fontSize: 16,
        color: 'black',
        paddingRight: 8,
        paddingLeft: 8,
        paddingTop: 0,
        paddingBottom: 0,
        flex: 1,
    },
    addCommentIcon: {
        width: 22,
        height: 22,
        tintColor: '#6200EA',
    },
});

const enhance = withObservables([], () => ({
    posts: PostDAO.observePosts(),
}));

export default enhance(Posts);

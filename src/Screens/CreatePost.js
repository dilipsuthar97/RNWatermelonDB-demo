// --------------- LIBRARIES ---------------
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from 'react-native';

// --------------- ASSETS ---------------
import { PostDAO } from '../Db';

// --------------- SCREEN ---------------
const CreatePostComment = ({ navigation, route }) => {
    const [post] = useState(route.params.post);
    const [type] = useState(route.params.type);
    const [title, setTitle] = useState(post?.title ?? '');
    const [body, setBody] = useState(post?.body ?? '');

    useEffect(() => {
        navigation.setOptions({
            title: type == 'create' ? 'Create Post' : 'Update Post',
        });
    });

    const onPressCreatePost = async () => {
        if (title == '' || body == '') {
            alert('Please fill required fields.');
            return;
        }

        if (type == 'create') {
            await PostDAO.createPost({ title, body });
            navigation.goBack();
            return;
        }

        await post.updatePost({ title, body });
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={(text) => setTitle(text)}
                placeholder='Title'
                placeholderTextColor='grey'
                // autoFocus={true}
            />
            <TextInput
                style={styles.input}
                value={body}
                onChangeText={(text) => setBody(text)}
                placeholder='Body (Optional)'
                placeholderTextColor='grey'
                multiline={true}
                scrollEnabled={true}
            />
            <TouchableOpacity
                delayPressIn={0}
                style={styles.button}
                onPress={onPressCreatePost}>
                <Text style={styles.buttonLabel}>
                    {type == 'create' ? 'Create Post' : 'Update Post'}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'white',
    },
    button: {
        borderColor: '#6200EA',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 6,
        borderWidth: 1,
        alignItems: 'center',
    },
    buttonLabel: {
        fontSize: 16,
        color: '#6200EA',
    },
    input: {
        marginBottom: 16,
        fontSize: 16,
        color: 'black',
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#6200EA',
        borderRadius: 6,
    },
});

export default CreatePostComment;

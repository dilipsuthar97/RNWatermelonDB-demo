// --------------- LIBRARIES ---------------
import { enableScreens } from 'react-native-screens';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// --------------- SCREENS ---------------
import Posts from './Screens/Posts';
import CreatePost from './Screens/CreatePost';

enableScreens();
const Stack = createStackNavigator();

// --------------- ROUTES ---------------
const Routes = () => {
    // --------------- RENDER ---------------
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName='Posts'
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: '#6200EA',
                        },
                        headerTitleStyle: {
                            fontSize: 18,
                        },
                        headerTintColor: 'white',
                    }}>
                    <Stack.Screen
                        name='Posts'
                        component={Posts}
                        options={{ title: 'Home' }}
                    />
                    <Stack.Screen name='Create' component={CreatePost} />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
};

export default Routes;

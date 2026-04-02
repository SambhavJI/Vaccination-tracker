import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import Screens
import BeforeLoginScreen from './src/screens/BeforeLoginScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import AfterLoginScreen from './src/screens/AfterLoginScreen';
import BasicInfoScreen from './src/screens/BasicInfoScreen';
import ReminderScreen from './src/screens/ReminderScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import DocumentScreen from './src/screens/DocumentScreen';
import ProfileFormScreen from './src/screens/ProfileFormScreen';
import RegisterBabyScreen from './src/screens/RegisterBabyScreen';
import TermsScreen from './src/screens/TermsScreen';
import FAQScreen from './src/screens/FAQScreen';

const Stack = createNativeStackNavigator();

import { FlashProvider } from './src/context/FlashContext';
import FlashMessage from './src/components/FlashMessage';

export default function App() {
    return (
        <FlashProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="BeforeLogin">
                    <Stack.Screen
                        name="BeforeLogin"
                        component={BeforeLoginScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Login"
                        component={LoginScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="SignUp"
                        component={SignUpScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="AfterLogin"
                        component={AfterLoginScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="BasicInfo"
                        component={BasicInfoScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Reminder"
                        component={ReminderScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="HomeScreen"
                        component={HomeScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Profile"
                        component={ProfileScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Document"
                        component={DocumentScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="ProfileForm"
                        component={ProfileFormScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="RegisterBaby"
                        component={RegisterBabyScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Terms"
                        component={TermsScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="FAQ"
                        component={FAQScreen}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
            <FlashMessage />
        </FlashProvider>
    );
}

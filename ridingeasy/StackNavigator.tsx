import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from './pages/SignIn';
import HomePage from './pages/HomePage';
import SignUp from './pages/SignUp';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    
   

    return (
        <Stack.Navigator>
            <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
            <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default StackNavigator

const styles = StyleSheet.create({})
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    StatusBar,
    TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const name = await AsyncStorage.getItem('userName');
                if (name !== null) {
                    setUserName(name);
                }
            } catch (error) {
                console.error('Error fetching user name:', error);
            }
        };

        fetchUserName();
    }, []);

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('userToken');
            await AsyncStorage.removeItem('userName');
            navigation.replace('BeforeLogin');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.greeting}>Welcome,</Text>
                    <Text style={styles.name}>{userName || 'Patient'}</Text>
                </View>

                <View style={styles.content}>
                    <Text style={styles.subtitle}>Your vaccination tracking dashboard will appear here.</Text>
                </View>

                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutButtonText}>Log Out</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 40,
        paddingBottom: 24,
    },
    header: {
        marginBottom: 40,
    },
    greeting: {
        fontSize: 24,
        color: '#64748b',
        fontWeight: '500',
    },
    name: {
        fontSize: 36,
        fontWeight: '800',
        color: '#0f172a',
        marginTop: 4,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#94a3b8',
        textAlign: 'center',
    },
    logoutButton: {
        backgroundColor: '#ef4444',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 'auto',
    },
    logoutButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
});

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageToggle from '../components/LanguageToggle';
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
    const { t } = useTranslation();

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
            <StatusBar barStyle="dark-content" backgroundColor="#FFF0F5" />
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.greeting}>{t('home.welcome')}</Text>
                        <Text style={styles.name}>{userName || t('home.defaultUser')}</Text>
                    </View>
                    <LanguageToggle />
                </View>

                <View style={styles.content}>
                    <Text style={styles.subtitle}>{t('home.dashboardSubtitle')}</Text>
                </View>

                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutButtonText}>{t('common.logOut')}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFF0F5',
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
        color: '#C48BA0',
        fontWeight: '500',
    },
    name: {
        fontSize: 36,
        fontWeight: '800',
        color: '#3D1A26',
        marginTop: 4,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#DEB8C8',
        textAlign: 'center',
    },
    logoutButton: {
        backgroundColor: '#F43F8A',
        borderRadius: 14,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 'auto',
        shadowColor: '#F43F8A',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.35,
        shadowRadius: 12,
        elevation: 5,
    },
    logoutButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
});

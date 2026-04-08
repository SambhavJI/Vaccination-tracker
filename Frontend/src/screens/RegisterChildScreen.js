import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StatusBar,
    Alert,
    ScrollView,
    ActivityIndicator,
    useWindowDimensions
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiPostAuth } from '../config/apiRequest';
import { useTranslation } from 'react-i18next';
import LanguageToggle from '../components/LanguageToggle';

export default function RegisterChildScreen({ navigation }) {
    const { t } = useTranslation();
    const [babyName, setBabyName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(''); // Expected format: YYYY-MM-DD
    const [loading, setLoading] = useState(false);
    const { width } = useWindowDimensions();
    const isSmallScreen = width < 360;

    const handleRegister = async () => {
        if (!babyName || !dateOfBirth) {
            Alert.alert(t('registerChild.error'), t('registerChild.fillFields'));
            return;
        }

        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(dateOfBirth)) {
            Alert.alert(t('registerChild.error'), t('registerChild.invalidDateFormat'));
            return;
        }

        setLoading(true);
        try {
            const token = await AsyncStorage.getItem('userToken');
            const { response, data } = await apiPostAuth('/admin/register-child', {
                babyName,
                dateOfBirth
            }, token);

            if (response.ok) {
                Alert.alert(t('registerChild.success'), t('registerChild.registeredSuccess'));
                navigation.replace('AfterLogin');
            } else {
                Alert.alert(t('registerChild.registrationFailed'), data.message || t('registerChild.somethingWrong'));
            }
        } catch (error) {
            console.error('Registration error:', error);
            Alert.alert(t('registerChild.error'), t('registerChild.connectionError'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFF0F5" />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.headerContainer}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                                <FontAwesome name="chevron-left" size={14} color="#F43F8A" />
                                <Text style={styles.backButtonText}>{t('registerChild.dashboard')}</Text>
                            </TouchableOpacity>
                            <LanguageToggle />
                        </View>
                        <Text style={[styles.title, isSmallScreen && { fontSize: 24 }]}>{t('registerBaby.title')}</Text>
                        <Text style={styles.subtitle}>{t('registerBaby.subtitle')}</Text>
                    </View>

                    <View style={styles.formContainer}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>{t('registerBaby.childName')}</Text>
                            <TextInput
                                style={styles.input}
                                placeholder={t('registerBaby.childNamePlaceholder')}
                                placeholderTextColor="#94a3b8"
                                value={babyName}
                                onChangeText={setBabyName}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>{t('registerBaby.dateOfBirth')}</Text>
                            <TextInput
                                style={styles.input}
                                placeholder={t('registerBaby.dateOfBirthPlaceholder')}
                                placeholderTextColor="#94a3b8"
                                value={dateOfBirth}
                                onChangeText={setDateOfBirth}
                                keyboardType="numeric"
                            />
                        </View>

                        <TouchableOpacity
                            style={[styles.registerButton, loading && { opacity: 0.7 }]}
                            onPress={handleRegister}
                            disabled={loading}
                        >
                            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.registerButtonText}>{t('registerChild.registerAndSchedule')}</Text>}
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
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
    },
    scrollContainer: {
        flexGrow: 1,
        padding: 24,
    },
    headerContainer: {
        marginBottom: 40,
        marginTop: 20,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 12,
        backgroundColor: '#FFE4EF',
        shadowColor: '#F43F8A',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        alignSelf: 'flex-start',
        marginBottom: 20,
    },
    backButtonText: {
        color: '#F43F8A',
        fontSize: 14,
        fontWeight: '700',
        marginLeft: 8,
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: '#3D1A26',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#C48BA0',
        lineHeight: 24,
    },
    formContainer: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#F43F8A',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 16,
        elevation: 4,
        borderWidth: 1,
        borderColor: '#FFE4EF',
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#A07080',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#FFF0F5',
        borderWidth: 1.5,
        borderColor: '#FFD6E8',
        borderRadius: 14,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        color: '#3D1A26',
    },
    registerButton: {
        backgroundColor: '#F43F8A',
        borderRadius: 14,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 10,
        shadowColor: '#F43F8A',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.35,
        shadowRadius: 12,
        elevation: 5,
    },
    registerButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '700',
    },
});

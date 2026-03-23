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

export default function RegisterChildScreen({ navigation }) {
    const [babyName, setBabyName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(''); // Expected format: YYYY-MM-DD
    const [loading, setLoading] = useState(false);
    const { width } = useWindowDimensions();
    const isSmallScreen = width < 360;

    const handleRegister = async () => {
        if (!babyName || !dateOfBirth) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(dateOfBirth)) {
            Alert.alert('Error', 'Please enter date in YYYY-MM-DD format');
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
                Alert.alert('Success', 'Child registered and vaccines scheduled!');
                navigation.replace('AfterLogin');
            } else {
                Alert.alert('Registration Failed', data.message || 'Something went wrong');
            }
        } catch (error) {
            console.error('Registration error:', error);
            Alert.alert('Error', 'Connection failed. Please check your network.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.headerContainer}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                            <FontAwesome name="chevron-left" size={14} color="#3b82f6" />
                            <Text style={styles.backButtonText}>Dashboard</Text>
                        </TouchableOpacity>
                        <Text style={[styles.title, isSmallScreen && { fontSize: 24 }]}>Register Child</Text>
                        <Text style={styles.subtitle}>Enter your child's details to schedule vaccinations</Text>
                    </View>

                    <View style={styles.formContainer}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Child's Name</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="e.g. Aarav"
                                placeholderTextColor="#94a3b8"
                                value={babyName}
                                onChangeText={setBabyName}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Date of Birth (YYYY-MM-DD)</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="2024-01-15"
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
                            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.registerButtonText}>Register & Schedule</Text>}
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
        backgroundColor: '#f8fafc',
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
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        alignSelf: 'flex-start',
        marginBottom: 20,
    },
    backButtonText: {
        color: '#3b82f6',
        fontSize: 14,
        fontWeight: '700',
        marginLeft: 8,
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: '#0f172a',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#64748b',
        lineHeight: 24,
    },
    formContainer: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 15,
        elevation: 2,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#334155',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#f8fafc',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        color: '#0f172a',
    },
    registerButton: {
        backgroundColor: '#3b82f6',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 10,
        shadowColor: '#3b82f6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    registerButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '700',
    },
});

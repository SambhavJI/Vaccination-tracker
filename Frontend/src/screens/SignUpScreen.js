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
    ScrollView,
    StatusBar,
    Alert,
    useWindowDimensions,
    ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiPost } from '../config/apiRequest';
import { useFlash } from '../context/FlashContext';

const showAlert = (title, message) => {
    if (Platform.OS === 'web') {
        window.alert(`${title}: ${message}`);
    } else {
        Alert.alert(title, message);
    }
};

const MIN_TOUCH_TARGET = 44;

export default function SignUpScreen({ route, navigation }) {
    const { showFlash } = useFlash();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showMissingUserAlert, setShowMissingUserAlert] = useState(route?.params?.showSignUpAlert || false);
    const [loading, setLoading] = useState(false);
    const { width, height } = useWindowDimensions();
    const isSmallScreen = height < 700 || width < 360;

    const handleSignUp = async () => {
        if (!name || !email || !password || !confirmPassword || !phone) {
            showFlash('Please fill in all fields', 'warning');
            return;
        }

        if (password !== confirmPassword) {
            showFlash('Passwords do not match', 'error');
            return;
        }
        setLoading(true);
        try {
            const { response, data } = await apiPost('/signup', { name, email, password, phone });

            if (response.ok) {
                const { response: loginResponse, data: loginData } = await apiPost('/login', { phone, password });

                if (loginResponse.ok) {
                    await AsyncStorage.setItem('userToken', loginData.token);
                    if (loginData.user && loginData.user.name) {
                        await AsyncStorage.setItem('userName', loginData.user.name);
                    }
                    console.log('Auto-login successful, redirecting to dashboard...');
                    showFlash('Account created and logged in automatically!', 'success');
                    setTimeout(() => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'AfterLogin' }],
                        });
                    }, 800);
                } else {
                    showFlash('Account created successfully! Please log in.', 'success');
                    navigation.navigate('Login');
                }
            } else {
                showFlash(data.message || 'Something went wrong', 'error');
            }
        } catch (error) {
            console.error('Sign up error:', error);
            showFlash('Connection Error. Check your internet.', 'error');
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
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            >
                <ScrollView
                    contentContainerStyle={[styles.scrollContainer, isSmallScreen && styles.scrollContainerSmall]}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Text style={styles.backButtonText}>← Back</Text>
                    </TouchableOpacity>

                    <View style={[styles.headerContainer, isSmallScreen && styles.headerContainerSmall]}>
                        <Text style={[styles.title, isSmallScreen && styles.titleSmall]}>Create Account</Text>
                        <Text style={[styles.subtitle, isSmallScreen && styles.subtitleSmall]}>Join us to start tracking your vaccinations easily</Text>
                    </View>

                    {showMissingUserAlert && (
                        <View style={styles.alertContainer}>
                            <Text style={styles.alertTitle}>Ready to join?</Text>
                            <Text style={styles.alertText}>We couldn't find an account with that phone number. Please sign up here first!</Text>
                            <TouchableOpacity onPress={() => setShowMissingUserAlert(false)} style={[styles.closeAlert, { minWidth: MIN_TOUCH_TARGET, minHeight: MIN_TOUCH_TARGET }]} activeOpacity={0.7}>
                                <Text style={styles.closeAlertText}>✕</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    <View style={styles.formContainer}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Full Name</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your full name"
                                placeholderTextColor="#94a3b8"
                                autoCapitalize="words"
                                value={name}
                                onChangeText={setName}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your email"
                                placeholderTextColor="#94a3b8"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoComplete="email"
                                value={email}
                                onChangeText={setEmail}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Phone Number</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your phone number"
                                placeholderTextColor="#94a3b8"
                                keyboardType="phone-pad"
                                value={phone}
                                onChangeText={setPhone}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Password</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Create a password"
                                placeholderTextColor="#94a3b8"
                                secureTextEntry
                                value={password}
                                onChangeText={setPassword}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Confirm Password</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Confirm your password"
                                placeholderTextColor="#94a3b8"
                                secureTextEntry
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                            />
                        </View>

                        <TouchableOpacity style={[styles.signupButton, { minHeight: MIN_TOUCH_TARGET, justifyContent: 'center' }]} onPress={handleSignUp} activeOpacity={0.8} disabled={loading}>
                            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.signupButtonText}>Sign Up</Text>}
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.footerContainer, isSmallScreen && styles.footerContainerSmall]}>
                        <Text style={styles.footerText}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ minHeight: MIN_TOUCH_TARGET, justifyContent: 'center' }} activeOpacity={0.7}>
                            <Text style={styles.loginText}>Log In</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    alertContainer: {
        backgroundColor: '#eff6ff',
        borderLeftWidth: 4,
        borderColor: '#3b82f6',
        padding: 16,
        marginBottom: 24,
        borderRadius: 8,
        position: 'relative',
    },
    alertTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1e3a8a',
        marginBottom: 4,
    },
    alertText: {
        fontSize: 14,
        color: '#1e40af',
        lineHeight: 20,
        marginRight: 20,
    },
    closeAlert: {
        position: 'absolute',
        top: 10,
        right: 12,
        padding: 4,
        zIndex: 10,
    },
    closeAlertText: {
        fontSize: 16,
        color: '#1e40af',
        fontWeight: '800',
    },
    safeArea: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    container: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingTop: 40,
        paddingBottom: 24,
    },
    scrollContainerSmall: {
        paddingHorizontal: 20,
        paddingTop: 24,
        paddingBottom: 20,
    },
    headerContainer: {
        marginBottom: 32,
    },
    headerContainerSmall: {
        marginBottom: 20,
    },
    titleSmall: {
        fontSize: 26,
    },
    subtitleSmall: {
        fontSize: 14,
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
        marginBottom: 30,
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
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        color: '#0f172a',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    signupButton: {
        backgroundColor: '#3b82f6',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 12,
        shadowColor: '#3b82f6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    signupButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 32,
        paddingTop: 20,
    },
    footerContainerSmall: {
        marginTop: 24,
        paddingTop: 16,
    },
    footerText: {
        color: '#64748b',
        fontSize: 15,
    },
    loginText: {
        color: '#3b82f6',
        fontSize: 15,
        fontWeight: '700',
    },
    backButton: {
        marginBottom: 20,
        alignSelf: 'flex-start',
    },
    backButtonText: {
        color: '#3b82f6',
        fontSize: 16,
        fontWeight: '600',
    },
});

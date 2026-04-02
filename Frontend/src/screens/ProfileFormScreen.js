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
    ActivityIndicator,
    useWindowDimensions,
    Switch
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { apiPutAuth } from '../config/apiRequest';
import { useFlash } from '../context/FlashContext';

const MIN_TOUCH_TARGET = 44;

export default function ProfileFormScreen({ route, navigation }) {
    const { showFlash } = useFlash();

    const existingProfile = route?.params?.profileData || {};

    // Basic Info
    const [address, setAddress] = useState(existingProfile.address || '');
    const [dob, setDob] = useState(existingProfile.dob ? existingProfile.dob.split('T')[0] : '');
    const [emergencyContact, setEmergencyContact] = useState(existingProfile.emergencyContact || '');
    
    // Medical
    const [conditions, setConditions] = useState(existingProfile.medical?.conditions?.join(', ') || '');
    const [allergies, setAllergies] = useState(existingProfile.medical?.allergies?.join(', ') || '');
    const [complications, setComplications] = useState(existingProfile.medical?.complications?.join(', ') || '');
    const [medications, setMedications] = useState(existingProfile.medical?.medications?.join(', ') || '');
    
    // Pregnancy
    const [lmp, setLmp] = useState(existingProfile.pregnancy?.lmp ? existingProfile.pregnancy.lmp.split('T')[0] : '');
    const calculateDueDate = (lmpDate) => {
        if (!lmpDate) return '';
        const date = new Date(lmpDate);
        if (isNaN(date.getTime())) return '';
        // Add 9 months
        date.setMonth(date.getMonth() + 9);
        return date.toISOString().split('T')[0];
    };
    const dueDate = calculateDueDate(lmp);
    
    const [trimester, setTrimester] = useState(existingProfile.pregnancy?.trimester ? existingProfile.pregnancy.trimester.toString() : '');
    const [bloodGroup, setBloodGroup] = useState(existingProfile.pregnancy?.bloodGroup || '');
    const [previousPregnancies, setPreviousPregnancies] = useState(existingProfile.pregnancy?.previousPregnancies !== undefined && existingProfile.pregnancy.previousPregnancies !== null ? existingProfile.pregnancy.previousPregnancies.toString() : '0');
    const [highRisk, setHighRisk] = useState(existingProfile.pregnancy?.highRisk || false);

    const [showDobPicker, setShowDobPicker] = useState(false);
    const [showLmpPicker, setShowLmpPicker] = useState(false);

    const handleDateChange = (event, selectedDate, setter, hidePicker) => {
        hidePicker(Platform.OS === 'ios');
        if (selectedDate) {
            setter(selectedDate.toISOString().split('T')[0]);
        }
    };

    const [loading, setLoading] = useState(false);
    const { width, height } = useWindowDimensions();
    const isSmallScreen = height < 700 || width < 360;

    const goBackOrHome = () => {
        if (route?.params?.fromProfile) {
            navigation.goBack();
        } else {
            navigation.reset({
                index: 0,
                routes: [{ name: 'AfterLogin' }],
            });
        }
    };

    const handleSkip = () => {
        goBackOrHome();
    };

    const handleSubmit = async () => {
        if (!address.trim() || !dob.trim() || !emergencyContact.trim() || !lmp.trim() || 
            !trimester.trim() || !bloodGroup.trim()) {
            showFlash('Basic Info and core Pregnancy details are mandatory.', 'warning');
            return;
        }

        setLoading(true);
        try {
            const processArray = (str) => str ? str.split(',').map(item => item.trim()).filter(Boolean) : [];

            const medical = {
                conditions: processArray(conditions),
                allergies: processArray(allergies),
                complications: processArray(complications),
                medications: processArray(medications)
            };

            const pregnancy = {
                lmp: lmp || undefined,
                dueDate: dueDate || undefined,
                trimester: trimester ? parseInt(trimester, 10) : undefined,
                bloodGroup: bloodGroup || undefined,
                previousPregnancies: previousPregnancies.trim() ? parseInt(previousPregnancies, 10) : 0,
                highRisk
            };

            const payload = {
                address,
                dob: dob || undefined, // Send undefined if empty
                emergencyContact,
                medical,
                pregnancy
            };

            const token = await AsyncStorage.getItem('userToken');
            const { response, data } = await apiPutAuth('/user/profile', payload, token);

            if (response.ok) {
                showFlash('Profile updated successfully!', 'success');
                setTimeout(() => {
                    goBackOrHome();
                }, 800);
            } else {
                showFlash(data.message || 'Failed to update profile', 'error');
            }
        } catch (error) {
            console.error('Profile update error:', error);
            showFlash('Connection Error. Check your internet.', 'error');
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
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            >
                <ScrollView
                    contentContainerStyle={[styles.scrollContainer, isSmallScreen && styles.scrollContainerSmall]}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.headerContainer}>
                        <Text style={styles.title}>{route?.params?.fromProfile ? "Edit Your Profile" : "Complete Your Profile"}</Text>
                        <Text style={styles.subtitle}>Help us give you a better personalized experience. Basic Info and core Pregnancy fields are mandatory.</Text>
                    </View>

                    <View style={styles.formContainer}>
                        
                        <Text style={styles.sectionTitle}>Basic Information</Text>
                        
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Address</Text>
                            <TextInput style={styles.input} placeholder="Enter your full address" placeholderTextColor="#94a3b8" value={address} onChangeText={setAddress} />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Date of Birth</Text>
                            {Platform.OS === 'web' ? (
                                <TextInput style={styles.input} placeholder="e.g. 1990-01-25 (YYYY-MM-DD)" placeholderTextColor="#94a3b8" keyboardType="numbers-and-punctuation" value={dob} onChangeText={setDob} />
                            ) : (
                                <>
                                    <TouchableOpacity onPress={() => setShowDobPicker(true)} style={[styles.input, { justifyContent: 'center' }]}>
                                        <Text style={{ fontSize: 16, color: dob ? '#3D1A26' : '#DEB8C8' }}>{dob || "Select your date of birth"}</Text>
                                    </TouchableOpacity>
                                    {showDobPicker && (
                                        <DateTimePicker
                                            value={(dob && new Date(dob).getFullYear() > 1900) ? new Date(dob) : new Date()}
                                            mode="date"
                                            display="default"
                                            maximumDate={new Date()}
                                            onChange={(e, d) => {
                                                if (Platform.OS !== 'ios') setShowDobPicker(false);
                                                handleDateChange(e, d, setDob, setShowDobPicker);
                                            }}
                                        />
                                    )}
                                </>
                            )}
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Emergency Contact</Text>
                            <TextInput style={styles.input} placeholder="Emergency phone number" placeholderTextColor="#94a3b8" keyboardType="phone-pad" value={emergencyContact} onChangeText={setEmergencyContact} />
                        </View>

                        <Text style={styles.sectionTitle}>Pregnancy Details</Text>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Last Menstrual Period (LMP) Date</Text>
                            {Platform.OS === 'web' ? (
                                <TextInput style={styles.input} placeholder="e.g. 2023-01-15 (YYYY-MM-DD)" placeholderTextColor="#94a3b8" keyboardType="numbers-and-punctuation" value={lmp} onChangeText={setLmp} />
                            ) : (
                                <>
                                    <TouchableOpacity onPress={() => setShowLmpPicker(true)} style={[styles.input, { justifyContent: 'center' }]}>
                                        <Text style={{ fontSize: 16, color: lmp ? '#3D1A26' : '#DEB8C8' }}>{lmp || "Select LMP Date"}</Text>
                                    </TouchableOpacity>
                                    {showLmpPicker && (
                                        <DateTimePicker
                                            value={(lmp && new Date(lmp).getFullYear() > 2000) ? new Date(lmp) : new Date()}
                                            mode="date"
                                            display="default"
                                            maximumDate={new Date()}
                                            onChange={(e, d) => {
                                                if (Platform.OS !== 'ios') setShowLmpPicker(false);
                                                handleDateChange(e, d, setLmp, setShowLmpPicker);
                                            }}
                                        />
                                    )}
                                </>
                            )}
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Expected Due Date (Auto-calculated)</Text>
                            <View style={[styles.input, { justifyContent: 'center', backgroundColor: '#FFE4EF' }]}>
                                <Text style={{ fontSize: 16, color: dueDate ? '#3D1A26' : '#DEB8C8' }}>{dueDate || "Determined by LMP Date"}</Text>
                            </View>
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Current Trimester (1, 2, or 3)</Text>
                            <TextInput style={styles.input} placeholder="e.g. 1" placeholderTextColor="#94a3b8" keyboardType="number-pad" value={trimester} onChangeText={setTrimester} />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Blood Group</Text>
                            <TextInput style={styles.input} placeholder="e.g. O+, A-, etc." placeholderTextColor="#94a3b8" value={bloodGroup} onChangeText={setBloodGroup} />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Previous Pregnancies</Text>
                            <TextInput style={styles.input} placeholder="e.g. 0, 1, 2" placeholderTextColor="#94a3b8" keyboardType="number-pad" value={previousPregnancies} onChangeText={setPreviousPregnancies} />
                        </View>
                        <View style={[styles.inputContainer, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}>
                            <Text style={styles.label}>High-Risk Pregnancy?</Text>
                            <Switch value={highRisk} onValueChange={setHighRisk} trackColor={{ false: "#FFD6E8", true: "#F43F8A" }} thumbColor={highRisk ? "#fff" : "#fff"} />
                        </View>

                        <Text style={styles.sectionTitle}>Medical Information</Text>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Medical Conditions (Comma separated)</Text>
                            <TextInput style={styles.input} placeholder="e.g. Diabetes, Asthma" placeholderTextColor="#94a3b8" value={conditions} onChangeText={setConditions} />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Allergies (Comma separated)</Text>
                            <TextInput style={styles.input} placeholder="e.g. Peanuts, Penicillin" placeholderTextColor="#94a3b8" value={allergies} onChangeText={setAllergies} />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Previous Complications (Comma separated)</Text>
                            <TextInput style={styles.input} placeholder="e.g. Gestational Diabetes" placeholderTextColor="#94a3b8" value={complications} onChangeText={setComplications} />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Current Medications (Comma separated)</Text>
                            <TextInput style={styles.input} placeholder="e.g. Prenatal Vitamins" placeholderTextColor="#94a3b8" value={medications} onChangeText={setMedications} />
                        </View>

                        <TouchableOpacity style={[styles.submitButton, { minHeight: MIN_TOUCH_TARGET, justifyContent: 'center' }]} onPress={handleSubmit} activeOpacity={0.8} disabled={loading}>
                            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitButtonText}>Save Details</Text>}
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.skipButton, { minHeight: MIN_TOUCH_TARGET, justifyContent: 'center' }]} onPress={handleSkip} activeOpacity={0.8} disabled={loading}>
                            <Text style={styles.skipButtonText}>{route?.params?.fromProfile ? "Cancel" : "Skip for now"}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#FFF0F5' },
    container: { flex: 1 },
    scrollContainer: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 40, paddingBottom: 24 },
    scrollContainerSmall: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 20 },
    headerContainer: { marginBottom: 32 },
    title: { fontSize: 28, fontWeight: '800', color: '#3D1A26', marginBottom: 8 },
    subtitle: { fontSize: 16, color: '#C48BA0', lineHeight: 24 },
    sectionTitle: { fontSize: 20, fontWeight: '700', color: '#3D1A26', marginTop: 10, marginBottom: 16, borderLeftWidth: 4, borderLeftColor: '#F43F8A', paddingLeft: 10 },
    formContainer: { marginBottom: 30 },
    inputContainer: { marginBottom: 16 },
    label: { fontSize: 14, fontWeight: '600', color: '#A07080', marginBottom: 8 },
    input: {
        backgroundColor: '#ffffff',
        borderWidth: 1.5,
        borderColor: '#FFD6E8',
        borderRadius: 14,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        color: '#3D1A26',
        shadowColor: '#F43F8A',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 2,
    },
    submitButton: {
        backgroundColor: '#F43F8A',
        borderRadius: 14,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 12,
        shadowColor: '#F43F8A',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.35,
        shadowRadius: 12,
        elevation: 5,
    },
    submitButtonText: { color: '#ffffff', fontSize: 16, fontWeight: '700', letterSpacing: 0.5 },
    skipButton: {
        backgroundColor: '#FFE4EF',
        borderRadius: 14,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 12,
        borderWidth: 1.5,
        borderColor: '#FFB3D0',
    },
    skipButtonText: { color: '#F43F8A', fontSize: 16, fontWeight: '600' }
});

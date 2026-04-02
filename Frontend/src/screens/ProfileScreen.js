import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    ActivityIndicator
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { apiGet } from '../config/apiRequest';
import { profileStyles as styles } from '../styles/profileStyles';

export default function ProfileScreen({ navigation }) {
    const [profile, setProfile] = useState(null);
    const [babies, setBabies] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProfile = async () => {
        setLoading(true);
        try {
            const token = await AsyncStorage.getItem('userToken');
            if (token) {
                const [profileRes, babyRes] = await Promise.all([
                    apiGet('/user/profile', token),
                    apiGet('/user/all-baby', token)
                ]);
                
                if (profileRes.response.ok) {
                    setProfile(profileRes.data);
                } else {
                    console.error('Failed to fetch profile:', profileRes.data);
                }

                if (babyRes.response.ok) {
                    setBabies(babyRes.data.babyInfo || []);
                }
            }
        } catch (error) {
            console.error('Error fetching profile', error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchProfile();
        }, [])
    );

    const InfoRow = ({ label, value, isLast }) => {
        return (
            <View style={[styles.infoRow, isLast && styles.infoRowLast]}>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.value}>{(value !== undefined && value !== null && value !== '') ? value : "Not provided"}</Text>
            </View>
        );
    };

    const SectionHeader = ({ icon, title }) => (
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>{icon}</Text>
            <Text style={styles.sectionTitle}>{title}</Text>
        </View>
    );

    if (loading || !profile) {
        return (
            <SafeAreaView style={[styles.safeArea, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color="#3b82f6" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
            
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <FontAwesome name="chevron-left" size={14} color="#e8703a" />
                    <Text style={styles.backText}>Dashboard</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>User Profile</Text>
                <TouchableOpacity
                    style={{ position: 'absolute', right: 24, alignSelf: 'center' }}
                    onPress={() => navigation.navigate('ProfileForm', { profileData: profile, fromProfile: true })}
                >
                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#e8703a' }}>Edit</Text>
                </TouchableOpacity>
            </View>

            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.heroSection}>
                    <View style={styles.avatarContainer}>
                        <Text style={styles.avatarEmoji}>👤</Text>
                    </View>
                    <Text style={styles.userName}>{profile.name}</Text>
                    {profile.role === 'admin' ? (
                        <Text style={styles.userTag}>Administrator</Text>
                    ) : (
                        <Text style={styles.userTag}>Registered User</Text>
                    )}
                </View>

                {/* Displaying Core Information Only if Missing Form */}
                <View style={styles.section}>
                    <SectionHeader icon="ℹ️" title="Basic Information" />
                    <View style={styles.card}>
                        <InfoRow label="Full Name" value={profile.name} />
                        <InfoRow label="Contact Number" value={profile.phone} />
                        <InfoRow label="Email ID" value={profile.email} />
                        
                        {/* Will only render if data was given in the Profile Form */}
                        <InfoRow label="Role" value={profile.role} />
                        <InfoRow label="Date of Birth" value={profile.dob ? profile.dob.split('T')[0] : null} />
                        <InfoRow label="Address" value={profile.address} />
                        <InfoRow label="Emergency Contact" value={profile.emergencyContact} isLast={true} />
                    </View>
                </View>

                <View style={styles.section}>
                    <SectionHeader icon="🍼" title="Pregnancy Details" />
                    <View style={styles.card}>
                        <InfoRow label="LMP Date" value={profile.pregnancy?.lmp ? profile.pregnancy.lmp.split('T')[0] : null} />
                        <InfoRow label="Expected Due Date" value={profile.pregnancy?.dueDate ? profile.pregnancy.dueDate.split('T')[0] : null} />
                        <InfoRow label="Trimester" value={profile.pregnancy?.trimester} />
                        <InfoRow label="Blood Group" value={profile.pregnancy?.bloodGroup} />
                        <InfoRow label="Previous Pregnancies" value={profile.pregnancy?.previousPregnancies} />
                        <InfoRow label="High-risk Status" value={profile.pregnancy?.highRisk ? 'Yes' : 'No'} isLast={true} />
                    </View>
                </View>

                <View style={styles.section}>
                    <SectionHeader icon="🏥" title="Medical Information" />
                    <View style={styles.card}>
                        <InfoRow label="Medical Conditions" value={profile.medical?.conditions?.join(', ')} />
                        <InfoRow label="Allergies" value={profile.medical?.allergies?.join(', ')} />
                        <InfoRow label="Previous Complications" value={profile.medical?.complications?.join(', ')} />
                        <InfoRow label="Current Medications" value={profile.medical?.medications?.join(', ')} isLast={true} />
                    </View>
                </View>
                
                <View style={styles.section}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                        <SectionHeader icon="👶" title="My Children" />
                        {babies.length === 0 && (
                            <TouchableOpacity 
                                onPress={() => navigation.navigate('RegisterBaby')}
                                style={{ backgroundColor: '#ebf5ff', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 }}
                            >
                                <Text style={{ color: '#3b82f6', fontWeight: 'bold' }}>+ Add Child</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    
                    {babies.length === 0 ? (
                        <View style={[styles.card, { alignItems: 'center', paddingVertical: 24 }]}>
                            <Text style={{ fontSize: 40, marginBottom: 10 }}>👶</Text>
                            <Text style={{ color: '#64748b', fontSize: 16, marginBottom: 10 }}>No children registered yet.</Text>
                        </View>
                    ) : (
                        babies.map((baby, idx) => (
                            <View key={idx} style={[styles.card, { marginBottom: 12 }]}>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: -10, zIndex: 1 }}>
                                    <TouchableOpacity onPress={() => navigation.navigate('RegisterBaby', { babyData: baby })}>
                                        <Text style={{ color: '#e8703a', fontWeight: 'bold' }}>Edit</Text>
                                    </TouchableOpacity>
                                </View>
                                <InfoRow label="Child's Name" value={baby.babyName} />
                                <InfoRow label="Date of Birth" value={new Date(baby.dateOfBirth).toISOString().split('T')[0]} />
                                <InfoRow label="Age" value={(() => { const months = Math.floor((new Date() - new Date(baby.dateOfBirth)) / (1000 * 60 * 60 * 24 * 30.44)); return months < 24 ? `${months} months` : `${Math.floor(months / 12)} years`; })()} />
                                <InfoRow label="Gender" value={baby.gender} />
                                <InfoRow label="Blood Group" value={baby.bloodGroup} />
                                <InfoRow label="Conception Date" value={baby.motherConceiveDate ? new Date(baby.motherConceiveDate).toISOString().split('T')[0] : null} isLast={true} />
                            </View>
                        ))
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

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
import { useTranslation } from 'react-i18next';
import LanguageToggle from '../components/LanguageToggle';

export default function ProfileScreen({ navigation }) {
    const { t } = useTranslation();
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
                <Text style={styles.value}>{(value !== undefined && value !== null && value !== '') ? value : t('profile.notProvided')}</Text>
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
                    <Text style={styles.backText}>{t('profile.dashboard')}</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{t('profile.userProfile')}</Text>
                <TouchableOpacity
                    style={{ position: 'absolute', right: 24, alignSelf: 'center' }}
                    onPress={() => navigation.navigate('ProfileForm', { profileData: profile, fromProfile: true })}
                >
                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#e8703a' }}>{t('profile.edit')}</Text>
                </TouchableOpacity>
            </View>
            <View style={{ alignItems: 'center', marginBottom: 8 }}>
                <LanguageToggle />
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
                        <Text style={styles.userTag}>{t('profile.administrator')}</Text>
                    ) : (
                        <Text style={styles.userTag}>{t('profile.registeredUser')}</Text>
                    )}
                </View>

                <View style={styles.section}>
                    <SectionHeader icon="ℹ️" title={t('profile.basicInformation')} />
                    <View style={styles.card}>
                        <InfoRow label={t('profile.fullName')} value={profile.name} />
                        <InfoRow label={t('profile.contactNumber')} value={profile.phone} />
                        <InfoRow label={t('profile.emailId')} value={profile.email} />
                        <InfoRow label={t('profile.role')} value={profile.role} />
                        <InfoRow label={t('profile.dateOfBirth')} value={profile.dob ? profile.dob.split('T')[0] : null} />
                        <InfoRow label={t('profile.address')} value={profile.address} />
                        <InfoRow label={t('profile.emergencyContact')} value={profile.emergencyContact} isLast={true} />
                    </View>
                </View>

                <View style={styles.section}>
                    <SectionHeader icon="🍼" title={t('profile.pregnancyDetails')} />
                    <View style={styles.card}>
                        <InfoRow label={t('profile.lmpDate')} value={profile.pregnancy?.lmp ? profile.pregnancy.lmp.split('T')[0] : null} />
                        <InfoRow label={t('profile.expectedDueDate')} value={profile.pregnancy?.dueDate ? profile.pregnancy.dueDate.split('T')[0] : null} />
                        <InfoRow label={t('profile.trimester')} value={profile.pregnancy?.trimester} />
                        <InfoRow label={t('profile.bloodGroup')} value={profile.pregnancy?.bloodGroup} />
                        <InfoRow label={t('profile.previousPregnancies')} value={profile.pregnancy?.previousPregnancies} />
                        <InfoRow label={t('profile.highRiskStatus')} value={profile.pregnancy?.highRisk ? t('profile.yes') : t('profile.no')} isLast={true} />
                    </View>
                </View>

                <View style={styles.section}>
                    <SectionHeader icon="🏥" title={t('profile.medicalInformation')} />
                    <View style={styles.card}>
                        <InfoRow label={t('profile.medicalConditions')} value={profile.medical?.conditions?.join(', ')} />
                        <InfoRow label={t('profile.allergies')} value={profile.medical?.allergies?.join(', ')} />
                        <InfoRow label={t('profile.previousComplications')} value={profile.medical?.complications?.join(', ')} />
                        <InfoRow label={t('profile.currentMedications')} value={profile.medical?.medications?.join(', ')} isLast={true} />
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                        <SectionHeader icon="👶" title={t('profile.myChildren')} />
                        {babies.length === 0 && (
                            <TouchableOpacity
                                onPress={() => navigation.navigate('RegisterBaby')}
                                style={{ backgroundColor: '#ebf5ff', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 }}
                            >
                                <Text style={{ color: '#3b82f6', fontWeight: 'bold' }}>+ {t('profile.addChild')}</Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    {babies.length === 0 ? (
                        <View style={[styles.card, { alignItems: 'center', paddingVertical: 24 }]}>
                            <Text style={{ fontSize: 40, marginBottom: 10 }}>👶</Text>
                            <Text style={{ color: '#64748b', fontSize: 16, marginBottom: 10 }}>{t('profile.noChildrenRegistered')}</Text>
                        </View>
                    ) : (
                        babies.map((baby, idx) => (
                            <View key={idx} style={[styles.card, { marginBottom: 12 }]}>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: -10, zIndex: 1 }}>
                                    <TouchableOpacity onPress={() => navigation.navigate('RegisterBaby', { babyData: baby })}>
                                        <Text style={{ color: '#e8703a', fontWeight: 'bold' }}>{t('profile.edit')}</Text>
                                    </TouchableOpacity>
                                </View>
                                <InfoRow label={t('profile.childName')} value={baby.babyName} />
                                <InfoRow label={t('profile.dateOfBirth')} value={new Date(baby.dateOfBirth).toISOString().split('T')[0]} />
                                <InfoRow label={t('profile.age')} value={(() => { const months = Math.floor((new Date() - new Date(baby.dateOfBirth)) / (1000 * 60 * 60 * 24 * 30.44)); return months < 24 ? `${months} महीने` : `${Math.floor(months / 12)} वर्ष`; })()} />
                                <InfoRow label={t('profile.gender')} value={baby.gender} />
                                <InfoRow label={t('profile.bloodGroup')} value={baby.bloodGroup} />
                                <InfoRow label={t('profile.conceptionDate')} value={baby.motherConceiveDate ? new Date(baby.motherConceiveDate).toISOString().split('T')[0] : null} isLast={true} />
                            </View>
                        ))
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

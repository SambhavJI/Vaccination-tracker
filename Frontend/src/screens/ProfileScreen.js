import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import 'core-js/stable/atob';
import { PROFILE_DATA } from '../data/profileData';
import { profileStyles as styles } from '../styles/profileStyles';

export default function ProfileScreen({ navigation }) {
    const { basicInfo, pregnancyDetails, medicalInformation } = PROFILE_DATA;
    const [userName, setUserName] = useState(basicInfo.fullName);
    const [phoneNumber, setPhoneNumber] = useState(basicInfo.contactNumber);
    const [userRole, setUserRole] = useState('user');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const name = await AsyncStorage.getItem('userName');
                const token = await AsyncStorage.getItem('userToken');

                if (name) {
                    setUserName(name);
                }

                if (token) {
                    try {
                        // Decode token to get phone and role which are stored in the JWT on the backend
                        const decoded = jwtDecode(token);
                        if (decoded.phone) setPhoneNumber(decoded.phone);
                        if (decoded.role) setUserRole(decoded.role);
                    } catch (e) {
                        console.error("Failed to decode token", e);
                    }
                }
            } catch (error) {
                console.error("Error reading AsyncStorage in Profile", error);
            }
        };

        fetchUserData();
    }, []);
    const InfoRow = ({ label, value, isLast }) => (
        <View style={[styles.infoRow, isLast && styles.infoRowLast]}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
        </View>
    );

    const SectionHeader = ({ icon, title }) => (
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>{icon}</Text>
            <Text style={styles.sectionTitle}>{title}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

            {/* Custom Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <FontAwesome name="chevron-left" size={14} color="#e8703a" />
                    <Text style={styles.backText}>Dashboard</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>User Profile</Text>
            </View>

            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Hero Section */}
                <View style={styles.heroSection}>
                    <View style={styles.avatarContainer}>
                        <Text style={styles.avatarEmoji}>🤰</Text>
                    </View>
                    <Text style={styles.userName}>{userName}</Text>
                    <Text style={styles.userTag}>Expecting Mom • {pregnancyDetails.trimester}</Text>
                </View>

                {/* Basic Personal Information */}
                <View style={styles.section}>
                    <SectionHeader icon="👤" title="Basic Information" />
                    <View style={styles.card}>
                        <InfoRow label="Full Name" value={userName} />
                        <InfoRow label="Age" value={`${basicInfo.age} Years`} />
                        <InfoRow label="Role" value={userRole} />
                        <InfoRow label="Date of Birth" value={basicInfo.dob} />
                        <InfoRow label="Contact Number" value={phoneNumber} />
                        <InfoRow label="Email ID" value={basicInfo.email} />
                        <InfoRow label="Address" value={basicInfo.address} />
                        <InfoRow label="Emergency Contact" value={basicInfo.emergencyContact} isLast={true} />
                    </View>
                </View>

                {/* Pregnancy Details */}
                <View style={styles.section}>
                    <SectionHeader icon="🍼" title="Pregnancy Details" />
                    <View style={styles.card}>
                        <InfoRow label="LMP Date" value={pregnancyDetails.lmpDate} />
                        <InfoRow label="Expected Due Date" value={pregnancyDetails.edd} />
                        <InfoRow label="Start Date" value={pregnancyDetails.startDate} />
                        <InfoRow label="Trimester" value={pregnancyDetails.trimester} />
                        <InfoRow label="Blood Group" value={pregnancyDetails.bloodGroup} />
                        <InfoRow label="Previous Pregnancies" value={pregnancyDetails.previousPregnancies} />
                        <View style={[styles.infoRow, styles.infoRowLast]}>
                            <Text style={styles.label}>High-risk Status</Text>
                            <View style={[
                                styles.statusBadge,
                                pregnancyDetails.highRiskStatus === 'Yes' && styles.highRiskBadge
                            ]}>
                                <Text style={[
                                    styles.statusText,
                                    pregnancyDetails.highRiskStatus === 'Yes' && styles.highRiskText
                                ]}>
                                    {pregnancyDetails.highRiskStatus}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Medical Information */}
                <View style={styles.section}>
                    <SectionHeader icon="🏥" title="Medical Information" />
                    <View style={styles.card}>
                        <InfoRow label="Medical Conditions" value={medicalInformation.conditions} />
                        <InfoRow label="Allergies" value={medicalInformation.allergies} />
                        <InfoRow label="Previous Complications" value={medicalInformation.complications} />
                        <InfoRow label="Current Medications" value={medicalInformation.medications} isLast={true} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

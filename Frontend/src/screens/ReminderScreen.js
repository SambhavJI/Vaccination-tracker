import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    ActivityIndicator,
    Alert
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { reminderStyles as styles } from '../styles/ReminderStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { apiGet } from '../config/apiRequest';

export default function ReminderScreen({ navigation }) {
    const [vaccines, setVaccines] = useState([]);
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
            const fetchVaccines = async () => {
                setLoading(true);
                try {
                    const token = await AsyncStorage.getItem('userToken');
                    if (!token) { setLoading(false); return; }

                    // We need a babyInfoId first. Let's get the first baby.
                    const { response: babyRes, data: babyData } = await apiGet('/user/all-baby', token);
                    if (babyRes.ok && babyData.babyInfo && babyData.babyInfo.length > 0) {
                        const babyId = babyData.babyInfo[0]._id;
                        
                        // Now fetch the vaccines
                        const { response: vacRes, data: vacData } = await apiGet(`/user/vaccines?babyInfoId=${babyId}`, token);
                        if (vacRes.ok && Array.isArray(vacData)) {
                            // Filter only Pending / Missed if we only want "Reminders", or just show all
                            // Strict chronological sort by default
                            const sorted = vacData.sort((a, b) => new Date(a.scheduledDate) - new Date(b.scheduledDate));
                            setVaccines(sorted);
                        }
                    }
                } catch (error) {
                    console.error('Error fetching reminders:', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchVaccines();
        }, [])
    );

    const getStatusColors = (status) => {
        if (status === 'Completed') return { bg: '#ecfdf5', text: '#10b981', icon: 'check-circle' };
        if (status === 'Missed') return { bg: '#fef2f2', text: '#ef4444', icon: 'exclamation-circle' };
        return { bg: '#eff6ff', text: '#3b82f6', icon: 'shield' }; // Pending
    };
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" />

            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <FontAwesome name="chevron-left" size={14} color="#3b82f6" />
                    <Text style={styles.backText}>Dashboard</Text>
                </TouchableOpacity>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={styles.title}>Vaccination Reminders</Text>
                    <Text style={styles.subtitle}>Stay updated with your child's schedule</Text>
                </View>
            </View>

            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                {loading ? (
                    <ActivityIndicator size="large" color="#3b82f6" style={{ marginTop: 40 }} />
                ) : vaccines.length === 0 ? (
                    <Text style={{ textAlign: 'center', marginTop: 40, color: '#64748b' }}>
                        No vaccines scheduled yet.
                    </Text>
                ) : (
                    vaccines.map((item) => {
                        const colors = getStatusColors(item.status);

                        return (
                            <View key={item._id} style={styles.reminderCard}>
                                <View style={[styles.iconContainer, { backgroundColor: colors.bg }]}>
                                    <FontAwesome name={colors.icon} size={20} color={colors.text} />
                                </View>

                                <View style={styles.infoContainer}>
                                    <Text style={styles.vaccineName}>{item.vaccine?.name || 'Reminder'}</Text>
                                    <View style={styles.dueContainer}>
                                        <Text style={styles.dueLabel}>Due:</Text>
                                        <Text style={styles.dueTime}>
                                            {item.scheduledDate ? new Date(item.scheduledDate).toLocaleDateString() : '—'}
                                        </Text>
                                    </View>
                                </View>

                                <View style={[styles.statusBadge, { backgroundColor: colors.bg, flexDirection: 'row', alignItems: 'center' }]}>
                                    <Text style={[styles.statusText, { color: colors.text }]}>
                                        {item.status}
                                    </Text>
                                </View>
                            </View>
                        );
                    })
                )}

                <View style={{ marginTop: 20, padding: 16, backgroundColor: '#fef2f2', borderRadius: 12 }}>
                    <Text style={{ color: '#991b1b', fontSize: 13, textAlign: 'center' }}>
                        🏥 Please visit your nearest health center on the due date.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

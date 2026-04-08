import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    ScrollView,
    FlatList,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiGet, apiPostAuth } from '../config/apiRequest';
import { useFlash } from '../context/FlashContext';
import { useFocusEffect } from '@react-navigation/native';
import { AfterLoginStyles as styles } from "../styles/AfterLoginStyles";

export default function AfterLoginScreen({ navigation }) {
    const { showFlash } = useFlash();
    const [userName, setUserName] = useState('');
    const [childInfo, setChildInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [vaccines, setVaccines] = useState([]);
    const [markingDone, setMarkingDone] = useState(false);

    const loadVaccines = async (babyId, token) => {
        try {
            const { response, data } = await apiGet(`/user/vaccines?babyInfoId=${babyId}`, token);
            if (response.ok && Array.isArray(data)) {
                // Sort by date strictly
                const sorted = data.sort((a, b) => new Date(a.scheduledDate) - new Date(b.scheduledDate));
                setVaccines(sorted);
            }
        } catch (err) {
            console.error('Error fetching vaccines:', err);
        }
    };

    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                try {
                    setLoading(true);
                    const name = await AsyncStorage.getItem('userName');
                    const token = await AsyncStorage.getItem('userToken');
                    if (name) setUserName(name);

                    if (token) {
                        const { response, data } = await apiGet('/user/all-baby', token);
                        if (response.ok && data.babyInfo && data.babyInfo.length > 0) {
                            const baby = data.babyInfo[0];
                            setChildInfo(baby);
                            await loadVaccines(baby._id, token);
                        } else {
                            setVaccines([]);
                        }
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }, [])
    );

    const handleMarkDone = async (userVaccineId) => {
        try {
            setMarkingDone(true);
            const token = await AsyncStorage.getItem('userToken');
            const { response, data } = await apiPostAuth('/user/set-completed-status', { userVaccineId }, token);
            if (response.ok) {
                showFlash('Vaccine marked as completed!', 'success');
                // Refresh vaccines
                const babyId = childInfo?._id;
                if (babyId) await loadVaccines(babyId, token);
            } else {
                showFlash(data.message || 'Failed to update', 'error');
            }
        } catch (err) {
            showFlash('Connection error', 'error');
        } finally {
            setMarkingDone(false);
        }
    };

    // Derived vaccine stats
    const pendingVaccines = vaccines.filter(v => v.status === 'Pending');
    const completedCount = vaccines.filter(v => v.status === 'Completed').length;
    const totalCount = vaccines.length;
    const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
    const nextVaccine = pendingVaccines.length > 0
        ? pendingVaccines.sort((a, b) => new Date(a.scheduledDate) - new Date(b.scheduledDate))[0]
        : null;
    const daysUntilNext = nextVaccine
        ? Math.ceil((new Date(nextVaccine.scheduledDate) - new Date()) / (1000 * 60 * 60 * 24))
        : null;

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('userToken');
            await AsyncStorage.removeItem('userName');
            navigation.replace('BeforeLogin');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const renderItem = ({ item, index }) => {
        const isPending = item.status === 'Pending';
        const isCompleted = item.status === 'Completed';
        const scheduledDate = item.scheduledDate
            ? new Date(item.scheduledDate).toLocaleDateString()
            : '—';
        return (
            <View
                style={[
                    styles.tableRow,
                    index === vaccines.length - 1 && styles.tableRowLast,
                    index % 2 === 0 && styles.tableRowEven,
                ]}
            >
                <Text style={styles.tableCell}>{scheduledDate}</Text>
                <Text style={styles.tableCell}>{item.vaccine?.name || '—'}</Text>
                <View
                    style={[
                        styles.statusBadge,
                        isPending ? styles.statusBadgePending : styles.statusBadgeDone,
                    ]}
                >
                    <Text
                        style={[
                            styles.statusText,
                            isPending ? styles.statusPending : styles.statusDone,
                        ]}
                    >
                        {item.status}
                    </Text>
                </View>
            </View>
        );
    };

    if (loading && !userName) {
        return (
            <SafeAreaView style={[styles.safeArea, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color="#e8703a" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#fdf6f0" />

            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* ── HERO HEADER ── */}
                <View style={[styles.heroContainer, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.heroEmoji}>🤱</Text>
                        <View>
                            <Text style={styles.welcomeText}>Welcome back,</Text>
                            <Text style={styles.userName}>{userName || 'Mom'} 👋</Text>
                        </View>
                    </View>
                    
                    {/* FAQ Button */}
                    <TouchableOpacity
                        style={{ padding: 8 }}
                        onPress={() => navigation.navigate('FAQ')}
                    >
                        <FontAwesome name="question-circle" size={28} color="#FFD6E8" />
                    </TouchableOpacity>
                </View>

                {/* ── CHILD INFO CARD ── */}
                <View style={[styles.card, styles.childCard]}>
                    <View style={styles.cardHeader}>
                        <View style={[styles.numberBadge, { backgroundColor: '#2d8a6a' }]}>
                            <Text style={styles.numberText}>👶</Text>
                        </View>
                        <Text style={[styles.cardTitle, { color: '#2d8a6a' }]}>My Child</Text>
                    </View>
                    <View style={[styles.divider, { backgroundColor: '#b2ddd0' }]} />
                    {childInfo ? (
                        <View style={styles.childInfoGrid}>
                            <View style={styles.childInfoItem}>
                                <Text style={styles.childInfoLabel}>Name</Text>
                                <Text style={styles.childInfoValue}>{childInfo.babyName}</Text>
                            </View>
                            <View style={styles.childInfoItem}>
                                <Text style={styles.childInfoLabel}>DOB</Text>
                                <Text style={styles.childInfoValue}>{new Date(childInfo.dateOfBirth).toLocaleDateString()}</Text>
                            </View>
                            <View style={styles.childInfoItem}>
                                <Text style={styles.childInfoLabel}>Age</Text>
                                <Text style={styles.childInfoValue}>
                                    {(() => { const months = Math.floor((new Date() - new Date(childInfo.dateOfBirth)) / (1000 * 60 * 60 * 24 * 30.44)); return months < 24 ? `${months} Mo` : `${Math.floor(months / 12)} Yrs`; })()}
                                </Text>
                            </View>
                            <View style={styles.childInfoItem}>
                                <Text style={styles.childInfoLabel}>Blood Group</Text>
                                <Text style={styles.childInfoValue}>{childInfo.bloodGroup || 'N/A'}</Text>
                            </View>
                        </View>
                    ) : (
                        <TouchableOpacity
                            style={{ padding: 20, alignItems: 'center' }}
                            onPress={() => navigation.navigate('RegisterBaby')}
                        >
                            <Text style={{ color: '#2d8a6a', fontWeight: 'bold' }}>+ Register Your Child</Text>
                        </TouchableOpacity>
                    )}
                </View>

                {/* ── NEXT VACCINE CARD ── */}
                <View style={[styles.card, styles.vaccineCard]}>
                    <View style={styles.cardHeader}>
                        <View style={[styles.numberBadge, { backgroundColor: '#1a56c4' }]}>
                            <Text style={styles.numberText}>💉</Text>
                        </View>
                        <Text style={[styles.cardTitle, { color: '#1a56c4' }]}>Next Vaccine</Text>
                    </View>
                    <View style={[styles.divider, { backgroundColor: '#b0c8f5' }]} />
                    {nextVaccine ? (
                        <View style={styles.vaccineRow}>
                            <View>
                                <Text style={styles.vaccineName}>{nextVaccine.vaccine?.name || 'Vaccine'}</Text>
                                <View style={styles.dueBadge}>
                                    <Text style={styles.dueText}>
                                        {daysUntilNext !== null
                                            ? daysUntilNext < 0
                                                ? `⚠️ Overdue by ${Math.abs(daysUntilNext)} day(s)`
                                                : daysUntilNext === 0
                                                    ? '⏰ Due Today'
                                                    : `⏰ Due in ${daysUntilNext} Day(s)`
                                            : '—'}
                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                style={[styles.markDoneButton, markingDone && { opacity: 0.6 }]}
                                onPress={() => handleMarkDone(nextVaccine._id)}
                                disabled={markingDone}
                            >
                                {markingDone
                                    ? <ActivityIndicator size="small" color="#fff" />
                                    : <Text style={styles.markDoneText}>Mark Done ✓</Text>}
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <Text style={{ padding: 16, color: '#2d8a6a', textAlign: 'center' }}>
                            {childInfo ? '🎉 All vaccines completed!' : 'Register a child to see vaccines'}
                        </Text>
                    )}
                </View>

                {/* ── PROGRESS CARD ── */}
                <View style={[styles.card, styles.progressCard]}>
                    <View style={styles.cardHeader}>
                        <View style={[styles.numberBadge, { backgroundColor: '#a0307a' }]}>
                            <Text style={styles.numberText}>📊</Text>
                        </View>
                        <Text style={[styles.cardTitle, { color: '#a0307a' }]}>Vaccination Progress</Text>
                    </View>
                    <View style={[styles.divider, { backgroundColor: '#efb8da' }]} />
                    <View style={styles.progressRow}>
                        <Text style={styles.progressFraction}>{completedCount} / {totalCount}</Text>
                        <Text style={styles.progressPercent}>{progressPercent}% Complete</Text>
                    </View>
                    <View style={styles.progressBarBg}>
                        <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
                    </View>
                    <Text style={styles.progressSubText}>{totalCount - completedCount} vaccines remaining</Text>
                </View>

                {/* ── VACCINATION SCHEDULE ── */}
                <Text style={styles.sectionLabel}>Vaccination Schedule</Text>
                <View style={[styles.card, { backgroundColor: '#fdf6f0', borderColor: '#f2d9c8' }]}>
                    {/* Table Header */}
                    <View style={styles.tableHeader}>
                        <Text style={styles.tableHeaderCell}>Date</Text>
                        <Text style={styles.tableHeaderCell}>Vaccine</Text>
                        <Text style={styles.tableHeaderCell}>Status</Text>
                    </View>
                    {vaccines.length === 0 ? (
                        <Text style={{ textAlign: 'center', padding: 20, color: '#999' }}>
                            {childInfo ? 'No vaccines found' : 'Register a child to see schedule'}
                        </Text>
                    ) : (
                        <FlatList
                            data={vaccines}
                            renderItem={renderItem}
                            keyExtractor={(item) => item._id}
                            scrollEnabled={false}
                        />
                    )}
                </View>

                {/* ── LOGOUT ── */}
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <FontAwesome name="sign-out" size={16} color="#fff" />
                    <Text style={styles.logoutText}>Log Out</Text>
                </TouchableOpacity>

                <View style={{ height: 80 }} />
            </ScrollView>

            {/* ── BOTTOM NAV ── */}
            <View style={styles.bottomNav}>
                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => navigation.navigate('Reminder')}
                >
                    <FontAwesome name="bell-o" size={22} color="#c47d1a" />
                    <Text style={styles.navText}>Reminders</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => navigation.navigate('Document')}
                >
                    <FontAwesome name="file-o" size={22} color="#2d8a6a" />
                    <Text style={styles.navText}>Documents</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => navigation.navigate('Profile')}
                >
                    <FontAwesome name="user-o" size={22} color="#1a56c4" />
                    <Text style={styles.navText}>Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => navigation.navigate('BasicInfo')}
                >
                    <FontAwesome name="info-circle" size={22} color="#a0307a" />
                    <Text style={styles.navText}>Basic Info</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

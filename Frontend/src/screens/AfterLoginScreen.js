import React, { useState, useEffect } from 'react';
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
import { apiGet } from '../config/apiRequest';
import { useFlash } from '../context/FlashContext';
import { AfterLoginStyles as styles } from "../styles/AfterLoginStyles";

export default function AfterLoginScreen({ navigation }) {
    const { showFlash } = useFlash();
    const [userName, setUserName] = useState('');
    const [childInfo, setChildInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [schedule] = useState([
        { age: 'At Birth', vaccine: 'BCG', status: 'Pending' },
        { age: 'At Birth', vaccine: 'OPV-0', status: 'Pending' },
        { age: '6 Weeks', vaccine: 'DPT-1', status: 'Pending' },
        { age: '6 Weeks', vaccine: 'OPV-1', status: 'Pending' },
        { age: '6 Weeks', vaccine: 'Hepatitis B-2', status: 'Pending' },
        { age: '10 Weeks', vaccine: 'DPT-2', status: 'Pending' },
        { age: '10 Weeks', vaccine: 'OPV-2', status: 'Pending' },
        { age: '14 Weeks', vaccine: 'DPT-3', status: 'Pending' },
        { age: '14 Weeks', vaccine: 'OPV-3', status: 'Pending' },
        { age: '14 Weeks', vaccine: 'Hepatitis B-3', status: 'Pending' },
    ]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const name = await AsyncStorage.getItem('userName');
                const token = await AsyncStorage.getItem('userToken');
                if (name) setUserName(name);

                if (token) {
                    const { response, data } = await apiGet('/user/all-baby', token);
                    if (response.ok && data.babyInfo && data.babyInfo.length > 0) {
                        setChildInfo(data.babyInfo[0]); // Display first child
                    }
                }
                console.log('Fetched AfterLogin data:', { name, hasToken: !!token, babies: data?.babyInfo?.length });
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
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

    const renderItem = ({ item, index }) => (
        <View
            style={[
                styles.tableRow,
                index === schedule.length - 1 && styles.tableRowLast,
                index % 2 === 0 && styles.tableRowEven,
            ]}
        >
            <Text style={styles.tableCell}>{item.age}</Text>
            <Text style={styles.tableCell}>{item.vaccine}</Text>
            <View
                style={[
                    styles.statusBadge,
                    item.status === 'Pending' ? styles.statusBadgePending : styles.statusBadgeDone,
                ]}
            >
                <Text
                    style={[
                        styles.statusText,
                        item.status === 'Pending' ? styles.statusPending : styles.statusDone,
                    ]}
                >
                    {item.status}
                </Text>
            </View>
        </View>
    );

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
                <View style={styles.heroContainer}>
                    <Text style={styles.heroEmoji}>🤱</Text>
                    <View>
                        <Text style={styles.welcomeText}>Welcome back,</Text>
                        <Text style={styles.userName}>{userName || 'Mom'} 👋</Text>
                    </View>
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
                                    {Math.floor((new Date() - new Date(childInfo.dateOfBirth)) / (1000 * 60 * 60 * 24 * 30.44))} Months
                                </Text>
                            </View>
                            <View style={styles.childInfoItem}>
                                <Text style={styles.childInfoLabel}>Blood Group</Text>
                                <Text style={styles.childInfoValue}>B+</Text>
                            </View>
                        </View>
                    ) : (
                        <TouchableOpacity
                            style={{ padding: 20, alignItems: 'center' }}
                            onPress={() => showFlash('Registering a child is an upcoming feature!', 'info')}
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
                    <View style={styles.vaccineRow}>
                        <View>
                            <Text style={styles.vaccineName}>DPT-2</Text>
                            <View style={styles.dueBadge}>
                                <Text style={styles.dueText}>⏰ Due in 5 Days</Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            style={styles.markDoneButton}
                            onPress={() => Alert.alert('Info', 'Feature coming soon!')}
                        >
                            <Text style={styles.markDoneText}>Mark Done ✓</Text>
                        </TouchableOpacity>
                    </View>
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
                        <Text style={styles.progressFraction}>7 / 15</Text>
                        <Text style={styles.progressPercent}>47% Complete</Text>
                    </View>
                    <View style={styles.progressBarBg}>
                        <View style={[styles.progressBarFill, { width: '47%' }]} />
                    </View>
                    <Text style={styles.progressSubText}>8 vaccines remaining</Text>
                </View>

                {/* ── VACCINATION SCHEDULE ── */}
                <Text style={styles.sectionLabel}>Vaccination Schedule</Text>
                <View style={[styles.card, { backgroundColor: '#fdf6f0', borderColor: '#f2d9c8' }]}>
                    {/* Table Header */}
                    <View style={styles.tableHeader}>
                        <Text style={styles.tableHeaderCell}>Age</Text>
                        <Text style={styles.tableHeaderCell}>Vaccine</Text>
                        <Text style={styles.tableHeaderCell}>Status</Text>
                    </View>
                    <FlatList
                        data={schedule}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        scrollEnabled={false}
                    />
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

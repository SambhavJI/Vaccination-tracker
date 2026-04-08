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
import { useTranslation } from 'react-i18next';
import LanguageToggle from '../components/LanguageToggle';

const MOTHER_STORAGE_KEY = 'mother_vaccine_status';

const MOTHER_VACCINES = [
    { id: 'm1', nameKey: 'motherVaccines.m1.name', timingKey: 'motherVaccines.m1.timing', icon: 'shield', bg: '#eff6ff', accent: '#1a56c4' },
    { id: 'm2', nameKey: 'motherVaccines.m2.name', timingKey: 'motherVaccines.m2.timing', icon: 'shield', bg: '#eff6ff', accent: '#1a56c4' },
    { id: 'm3', nameKey: 'motherVaccines.m3.name', timingKey: 'motherVaccines.m3.timing', icon: 'medkit', bg: '#f0fdf4', accent: '#16a34a' },
    { id: 'm4', nameKey: 'motherVaccines.m4.name', timingKey: 'motherVaccines.m4.timing', icon: 'medkit', bg: '#f0fdf4', accent: '#16a34a' },
    { id: 'm5', nameKey: 'motherVaccines.m5.name', timingKey: 'motherVaccines.m5.timing', icon: 'plus-circle', bg: '#fef3c7', accent: '#d97706' },
    { id: 'm6', nameKey: 'motherVaccines.m6.name', timingKey: 'motherVaccines.m6.timing', icon: 'heart', bg: '#fdf2f8', accent: '#be185d' },
    { id: 'm7', nameKey: 'motherVaccines.m7.name', timingKey: 'motherVaccines.m7.timing', icon: 'heart', bg: '#fdf2f8', accent: '#be185d' },
];

export default function AfterLoginScreen({ navigation }) {
    const { showFlash } = useFlash();
    const { t } = useTranslation();
    const [userName, setUserName] = useState('');
    const [childInfo, setChildInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [vaccines, setVaccines] = useState([]);
    const [markingDone, setMarkingDone] = useState(false);
    const [motherStatus, setMotherStatus] = useState({});

    // Load saved mother vaccine statuses
    const loadMotherStatus = async () => {
        try {
            const saved = await AsyncStorage.getItem(MOTHER_STORAGE_KEY);
            if (saved) setMotherStatus(JSON.parse(saved));
        } catch (_) { }
    };

    const toggleMotherVaccine = async (id) => {
        const updated = { ...motherStatus };
        if (updated[id]?.done) {
            delete updated[id];
        } else {
            const now = new Date();
            const dateStr = now.toLocaleDateString('hi-IN', { day: '2-digit', month: 'short', year: 'numeric' });
            const timeStr = now.toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' });
            updated[id] = { done: true, time: `${dateStr}, ${timeStr}` };
        }
        setMotherStatus(updated);
        await AsyncStorage.setItem(MOTHER_STORAGE_KEY, JSON.stringify(updated));
    };

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
                            setChildInfo(null);
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
            loadMotherStatus();
        }, [])
    );

    const handleMarkDone = async (userVaccineId) => {
        try {
            setMarkingDone(true);
            const token = await AsyncStorage.getItem('userToken');
            const { response, data } = await apiPostAuth('/user/set-completed-status', { userVaccineId }, token);
            if (response.ok) {
                showFlash(t('afterLogin.vaccineMarkedDone'), 'success');
                const babyId = childInfo?._id;
                if (babyId) await loadVaccines(babyId, token);
            } else {
                showFlash(data.message || t('afterLogin.failedToUpdate'), 'error');
            }
        } catch (err) {
            showFlash(t('afterLogin.connectionError'), 'error');
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
        const scheduledDate = item.scheduledDate
            ? new Date(item.scheduledDate).toLocaleDateString()
            : '—';

        const statusLabel =
            item.status === 'Completed' ? t('afterLogin.statusCompleted') :
                item.status === 'Missed' ? t('afterLogin.statusMissed') :
                    t('afterLogin.statusPending');

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
                        {statusLabel}
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
                            <Text style={styles.welcomeText}>{t('afterLogin.welcomeBack')}</Text>
                            <Text style={styles.userName}>{userName || t('afterLogin.defaultUser')} 👋</Text>
                        </View>
                    </View>

                    {/* FAQ Button & Language Toggle */}
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <LanguageToggle />
                        <TouchableOpacity
                            style={{ padding: 8, marginLeft: 4 }}
                            onPress={() => navigation.navigate('FAQ')}
                        >
                            <FontAwesome name="question-circle" size={28} color="#FFD6E8" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* ── CHILD INFO CARD ── */}
                <View style={[styles.card, styles.childCard]}>
                    <View style={styles.cardHeader}>
                        <View style={[styles.numberBadge, { backgroundColor: '#2d8a6a' }]}>
                            <Text style={styles.numberText}>👶</Text>
                        </View>
                        <Text style={[styles.cardTitle, { color: '#2d8a6a' }]}>{t('afterLogin.myChild')}</Text>
                    </View>
                    <View style={[styles.divider, { backgroundColor: '#b2ddd0' }]} />
                    {childInfo ? (
                        <View style={styles.childInfoGrid}>
                            <View style={styles.childInfoItem}>
                                <Text style={styles.childInfoLabel}>{t('afterLogin.childName')}</Text>
                                <Text style={styles.childInfoValue}>{childInfo.babyName}</Text>
                            </View>
                            <View style={styles.childInfoItem}>
                                <Text style={styles.childInfoLabel}>{t('afterLogin.childDob')}</Text>
                                <Text style={styles.childInfoValue}>{new Date(childInfo.dateOfBirth).toLocaleDateString()}</Text>
                            </View>
                            <View style={styles.childInfoItem}>
                                <Text style={styles.childInfoLabel}>{t('afterLogin.childAge')}</Text>
                                <Text style={styles.childInfoValue}>
                                    {(() => { const months = Math.floor((new Date() - new Date(childInfo.dateOfBirth)) / (1000 * 60 * 60 * 24 * 30.44)); return months < 24 ? `${months} Mo` : `${Math.floor(months / 12)} Yrs`; })()}
                                </Text>
                            </View>
                            <View style={styles.childInfoItem}>
                                <Text style={styles.childInfoLabel}>{t('afterLogin.bloodGroup')}</Text>
                                <Text style={styles.childInfoValue}>{childInfo.bloodGroup || 'N/A'}</Text>
                            </View>
                        </View>
                    ) : (
                        <TouchableOpacity
                            style={{ padding: 20, alignItems: 'center' }}
                            onPress={() => navigation.navigate('RegisterBaby')}
                        >
                            <Text style={{ color: '#2d8a6a', fontWeight: 'bold' }}>{t('afterLogin.registerChild')}</Text>
                        </TouchableOpacity>
                    )}
                </View>

                {/* ── NEXT VACCINE CARD ── */}
                <View style={[styles.card, styles.vaccineCard]}>
                    <View style={styles.cardHeader}>
                        <View style={[styles.numberBadge, { backgroundColor: '#1a56c4' }]}>
                            <Text style={styles.numberText}>💉</Text>
                        </View>
                        <Text style={[styles.cardTitle, { color: '#1a56c4' }]}>{t('afterLogin.nextVaccine')}</Text>
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
                                                ? t('afterLogin.overdueBy', { count: Math.abs(daysUntilNext) })
                                                : daysUntilNext === 0
                                                    ? t('afterLogin.dueToday')
                                                    : t('afterLogin.dueIn', { count: daysUntilNext })
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
                                    : <Text style={styles.markDoneText}>{t('afterLogin.markDone')}</Text>}
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <Text style={{ padding: 16, color: '#2d8a6a', textAlign: 'center' }}>
                            {childInfo ? t('afterLogin.allCompleted') : t('afterLogin.registerToSeeVaccines')}
                        </Text>
                    )}
                </View>

                {/* ── PROGRESS CARD ── */}
                <View style={[styles.card, styles.progressCard]}>
                    <View style={styles.cardHeader}>
                        <View style={[styles.numberBadge, { backgroundColor: '#a0307a' }]}>
                            <Text style={styles.numberText}>📊</Text>
                        </View>
                        <Text style={[styles.cardTitle, { color: '#a0307a' }]}>{t('afterLogin.vaccinationProgress')}</Text>
                    </View>
                    <View style={[styles.divider, { backgroundColor: '#efb8da' }]} />
                    <View style={styles.progressRow}>
                        <Text style={styles.progressFraction}>{completedCount} / {totalCount}</Text>
                        <Text style={styles.progressPercent}>{progressPercent}{t('afterLogin.complete')}</Text>
                    </View>
                    <View style={styles.progressBarBg}>
                        <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
                    </View>
                    <Text style={styles.progressSubText}>{totalCount - completedCount} {t('afterLogin.vaccinesRemaining')}</Text>
                </View>

                {/* ── VACCINATION SCHEDULE (child) / MOTHER VACCINES (no child) ── */}
                <Text style={styles.sectionLabel}>
                    {childInfo ? t('afterLogin.vaccinationSchedule') : t('afterLogin.motherVaccineSchedule')}
                </Text>

                {childInfo ? (
                    /* ── Child vaccine table ── */
                    <View style={[styles.card, { backgroundColor: '#fdf6f0', borderColor: '#f2d9c8' }]}>
                        <View style={styles.tableHeader}>
                            <Text style={styles.tableHeaderCell}>{t('afterLogin.date')}</Text>
                            <Text style={styles.tableHeaderCell}>{t('afterLogin.vaccine')}</Text>
                            <Text style={styles.tableHeaderCell}>{t('afterLogin.status')}</Text>
                        </View>
                        {vaccines.length === 0 ? (
                            <Text style={{ textAlign: 'center', padding: 20, color: '#999' }}>
                                {t('afterLogin.noVaccines')}
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
                ) : (
                    /* ── Mother's interactive vaccine cards ── */
                    <View>
                        {/* Progress mini-bar */}
                        {(() => {
                            const doneCount = MOTHER_VACCINES.filter(v => motherStatus[v.id]?.done).length;
                            const pct = Math.round((doneCount / MOTHER_VACCINES.length) * 100);
                            return (
                                <View style={{
                                    backgroundColor: '#fff', borderRadius: 14, padding: 14,
                                    marginBottom: 12, borderWidth: 1, borderColor: '#fce7f3',
                                }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                                        <Text style={{ fontWeight: '700', color: '#be185d', fontSize: 14 }}>💉 {t('afterLogin.motherVaccineProgress')}</Text>
                                        <Text style={{ fontWeight: '700', color: '#be185d', fontSize: 14 }}>{doneCount}/{MOTHER_VACCINES.length}</Text>
                                    </View>
                                    <View style={{ backgroundColor: '#fce7f3', borderRadius: 8, height: 10 }}>
                                        <View style={{ width: `${pct}%`, backgroundColor: '#be185d', borderRadius: 8, height: 10 }} />
                                    </View>
                                    <Text style={{ color: '#9ca3af', fontSize: 12, marginTop: 6 }}>
                                        {pct}{t('afterLogin.complete')} • {MOTHER_VACCINES.length - doneCount} {t('afterLogin.vaccinesRemaining')}
                                    </Text>
                                </View>
                            );
                        })()}

                        {MOTHER_VACCINES.map(item => {
                            const isDone = !!motherStatus[item.id]?.done;
                            const doneTime = motherStatus[item.id]?.time;
                            return (
                                <View key={item.id} style={{
                                    backgroundColor: '#fff', borderRadius: 14, marginBottom: 10,
                                    padding: 14, borderWidth: 1.5,
                                    borderColor: isDone ? '#10b981' : item.accent + '44',
                                    elevation: 1,
                                }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={{
                                            width: 38, height: 38, borderRadius: 10,
                                            backgroundColor: isDone ? '#ecfdf5' : item.bg,
                                            alignItems: 'center', justifyContent: 'center', marginRight: 10,
                                        }}>
                                            <FontAwesome
                                                name={isDone ? 'check-circle' : item.icon}
                                                size={18}
                                                color={isDone ? '#10b981' : item.accent}
                                            />
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ fontSize: 13, fontWeight: '700', color: '#1e293b' }}>{t(item.nameKey)}</Text>
                                            <Text style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>⏰ {t(item.timingKey)}</Text>
                                        </View>
                                        <TouchableOpacity
                                            onPress={() => toggleMotherVaccine(item.id)}
                                            style={{
                                                paddingHorizontal: 11, paddingVertical: 6, borderRadius: 18,
                                                backgroundColor: isDone ? '#ecfdf5' : item.accent,
                                                borderWidth: isDone ? 1.5 : 0,
                                                borderColor: isDone ? '#10b981' : 'transparent',
                                            }}
                                        >
                                            <Text style={{ fontSize: 12, fontWeight: '700', color: isDone ? '#10b981' : '#fff' }}>
                                                {isDone ? t('afterLogin.vaccinated') : t('afterLogin.getVaccinated')}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    {isDone && doneTime && (
                                        <View style={{
                                            marginTop: 8, marginLeft: 48, flexDirection: 'row',
                                            alignItems: 'center', backgroundColor: '#f0fdf4',
                                            borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4,
                                            alignSelf: 'flex-start',
                                        }}>
                                            <FontAwesome name="clock-o" size={10} color="#10b981" style={{ marginRight: 4 }} />
                                            <Text style={{ fontSize: 11, color: '#10b981', fontWeight: '600' }}>
                                                {doneTime} {t('afterLogin.vaccinatedOn')}
                                            </Text>
                                        </View>
                                    )}
                                </View>
                            );
                        })}
                    </View>
                )}

                {/* ── LOGOUT ── */}
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <FontAwesome name="sign-out" size={16} color="#fff" />
                    <Text style={styles.logoutText}>{t('common.logOut')}</Text>
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
                    <Text style={styles.navText}>{t('afterLogin.reminders')}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => navigation.navigate('Document')}
                >
                    <FontAwesome name="file-o" size={22} color="#2d8a6a" />
                    <Text style={styles.navText}>{t('afterLogin.documents')}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => navigation.navigate('Profile')}
                >
                    <FontAwesome name="user-o" size={22} color="#1a56c4" />
                    <Text style={styles.navText}>{t('afterLogin.profile')}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => navigation.navigate('BasicInfo')}
                >
                    <FontAwesome name="info-circle" size={22} color="#a0307a" />
                    <Text style={styles.navText}>{t('afterLogin.basicInfo')}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => navigation.navigate('Terms')}
                >
                    <FontAwesome name="file-text-o" size={22} color="#6b7280" />
                    <Text style={styles.navText}>{t('afterLogin.terms')}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

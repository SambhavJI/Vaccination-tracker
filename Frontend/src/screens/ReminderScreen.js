import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    ActivityIndicator,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { reminderStyles as styles } from '../styles/ReminderStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { apiGet } from '../config/apiRequest';
import { useTranslation } from 'react-i18next';
import LanguageToggle from '../components/LanguageToggle';

const STORAGE_KEY = 'mother_vaccine_status';

// Mother's standard vaccine schedule (when no child is registered)
const MOTHER_VACCINES = [
    {
        id: 'm1',
        
        icon: 'shield',
        bg: '#eff6ff',
        accent: '#1a56c4',
    },
    {
        id: 'm2',
        
        icon: 'shield',
        bg: '#eff6ff',
        accent: '#1a56c4',
    },
    {
        id: 'm3',
        
        icon: 'medkit',
        bg: '#f0fdf4',
        accent: '#16a34a',
    },
    {
        id: 'm4',
        
        icon: 'medkit',
        bg: '#f0fdf4',
        accent: '#16a34a',
    },
    {
        id: 'm5',
        
        icon: 'plus-circle',
        bg: '#fef3c7',
        accent: '#d97706',
    },
    {
        id: 'm6',
        
        icon: 'heart',
        bg: '#fdf2f8',
        accent: '#be185d',
    },
    {
        id: 'm7',
        
        icon: 'heart',
        bg: '#fdf2f8',
        accent: '#be185d',
    },
];

export default function ReminderScreen({ navigation }) {
    const { t } = useTranslation();
    const [vaccines, setVaccines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [childRegistered, setChildRegistered] = useState(false);
    const [activeTab, setActiveTab] = useState('upcoming');
    // mother vaccine status: { m1: { done: true, time: '12 Apr 2025, 10:30' }, ... }
    const [motherStatus, setMotherStatus] = useState({});

    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                setLoading(true);
                try {
                    const token = await AsyncStorage.getItem('userToken');

                    // Load saved mother vaccine statuses
                    const saved = await AsyncStorage.getItem(STORAGE_KEY);
                    if (saved) setMotherStatus(JSON.parse(saved));

                    if (!token) { setLoading(false); return; }

                    const { response: babyRes, data: babyData } = await apiGet('/user/all-baby', token);
                    if (babyRes.ok && babyData.babyInfo && babyData.babyInfo.length > 0) {
                        setChildRegistered(true);
                        const babyId = babyData.babyInfo[0]._id;
                        const { response: vacRes, data: vacData } = await apiGet(`/user/vaccines?babyInfoId=${babyId}`, token);
                        if (vacRes.ok && Array.isArray(vacData)) {
                            const sorted = vacData.sort((a, b) => new Date(a.scheduledDate) - new Date(b.scheduledDate));
                            setVaccines(sorted);
                        }
                    } else {
                        setChildRegistered(false);
                    }
                } catch (error) {
                    console.error('Error fetching reminders:', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }, [])
    );

    // Toggle mother vaccine done status
    const toggleMotherVaccine = async (id) => {
        const updated = { ...motherStatus };
        if (updated[id]?.done) {
            // Un-mark
            delete updated[id];
        } else {
            // Mark done with current timestamp
            const now = new Date();
            const dateStr = now.toLocaleDateString('hi-IN', {
                day: '2-digit', month: 'short', year: 'numeric',
            });
            const timeStr = now.toLocaleTimeString('hi-IN', {
                hour: '2-digit', minute: '2-digit',
            });
            updated[id] = { done: true, time: `${dateStr}, ${timeStr}` };
        }
        setMotherStatus(updated);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    };

    const getStatusColors = (status) => {
        if (status === 'Completed') return { bg: '#ecfdf5', text: '#10b981', icon: 'check-circle' };
        if (status === 'Missed') return { bg: '#fef2f2', text: '#ef4444', icon: 'exclamation-circle' };
        return { bg: '#eff6ff', text: '#3b82f6', icon: 'shield' };
    };

    const getStatusLabel = (status) => {
        if (status === 'Completed') return t('afterLogin.statusCompleted');
        if (status === 'Missed') return t('afterLogin.statusMissed');
        return t('afterLogin.statusPending');
    };

    const upcomingVaccines = vaccines.filter(v => v.status !== 'Completed');
    const completedVaccines = vaccines.filter(v => v.status === 'Completed');
    const displayList = activeTab === 'upcoming' ? upcomingVaccines : completedVaccines;

    // Mother completed count
    const motherDoneCount = MOTHER_VACCINES.filter(v => motherStatus[v.id]?.done).length;

    /* ─── Mother Vaccine Card ─── */
    const MotherVaccineCard = ({ item }) => {
        const isDone = !!motherStatus[item.id]?.done;
        const doneTime = motherStatus[item.id]?.time;

        return (
            <View style={{
                backgroundColor: '#fff',
                borderRadius: 16,
                marginBottom: 12,
                padding: 14,
                borderWidth: 1.5,
                borderColor: isDone ? '#10b981' : item.accent + '44',
                shadowColor: item.accent,
                shadowOpacity: 0.07,
                shadowRadius: 6,
                elevation: 2,
            }}>
                {/* Top row: icon + name + toggle */}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{
                        width: 40, height: 40, borderRadius: 12,
                        backgroundColor: isDone ? '#ecfdf5' : item.bg,
                        alignItems: 'center', justifyContent: 'center', marginRight: 12,
                    }}>
                        <FontAwesome
                            name={isDone ? 'check-circle' : item.icon}
                            size={20}
                            color={isDone ? '#10b981' : item.accent}
                        />
                    </View>

                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 14, fontWeight: '700', color: '#1e293b' }}>
                            {t(`motherVaccines.${item.id}.name`)}
                        </Text>
                        <Text style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>
                            ⏰ {t(`motherVaccines.${item.id}.timing`)}
                        </Text>
                    </View>

                    {/* Done / Undo button */}
                    <TouchableOpacity
                        onPress={() => toggleMotherVaccine(item.id)}
                        style={{
                            paddingHorizontal: 12,
                            paddingVertical: 7,
                            borderRadius: 20,
                            backgroundColor: isDone ? '#ecfdf5' : item.accent,
                            borderWidth: isDone ? 1.5 : 0,
                            borderColor: isDone ? '#10b981' : 'transparent',
                        }}
                        activeOpacity={0.8}
                    >
                        <Text style={{
                            fontSize: 12,
                            fontWeight: '700',
                            color: isDone ? '#10b981' : '#fff',
                        }}>
                            {isDone ? t('reminder.done') : t('reminder.markDone')}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Description */}
                <Text style={{ fontSize: 12, color: '#9ca3af', marginTop: 8, marginLeft: 52 }}>
                    {t(`motherVaccines.${item.id}.desc`)}
                </Text>

                {/* Completion timestamp */}
                {isDone && doneTime && (
                    <View style={{
                        marginTop: 8, marginLeft: 52,
                        flexDirection: 'row', alignItems: 'center',
                        backgroundColor: '#f0fdf4', borderRadius: 8,
                        paddingHorizontal: 10, paddingVertical: 5,
                        alignSelf: 'flex-start',
                    }}>
                        <FontAwesome name="clock-o" size={11} color="#10b981" style={{ marginRight: 5 }} />
                        <Text style={{ fontSize: 11, color: '#10b981', fontWeight: '600' }}>
                            {t('reminder.doneAt', { time: doneTime })}
                        </Text>
                    </View>
                )}
            </View>
        );
    };

    /* ─── Child Vaccine Card ─── */
    const ChildVaccineCard = ({ item }) => {
        const colors = getStatusColors(item.status);
        return (
            <View style={styles.reminderCard}>
                <View style={[styles.iconContainer, { backgroundColor: colors.bg }]}>
                    <FontAwesome name={colors.icon} size={20} color={colors.text} />
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.vaccineName}>{item.vaccine?.name || t('reminder.reminder')}</Text>
                    <View style={styles.dueContainer}>
                        <Text style={styles.dueLabel}>{t('reminder.due')}:</Text>
                        <Text style={styles.dueTime}>
                            {item.scheduledDate ? new Date(item.scheduledDate).toLocaleDateString() : '—'}
                        </Text>
                    </View>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: colors.bg }]}>
                    <Text style={[styles.statusText, { color: colors.text }]}>
                        {getStatusLabel(item.status)}
                    </Text>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" />

            {/* ── Header ── */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <FontAwesome name="chevron-left" size={14} color="#3b82f6" />
                    <Text style={styles.backText}>{t('reminder.dashboard')}</Text>
                </TouchableOpacity>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={styles.title}>{t('reminder.title')}</Text>
                    <Text style={styles.subtitle}>
                        {childRegistered ? t('reminder.subtitleChild') : t('reminder.subtitleMother')}
                    </Text>
                </View>
                <LanguageToggle />
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#3b82f6" style={{ marginTop: 60 }} />
            ) : childRegistered ? (
                /* ── CHILD REGISTERED: Tab View ── */
                <>
                    <View style={{
                        flexDirection: 'row', marginHorizontal: 20, marginTop: 16, marginBottom: 8,
                        backgroundColor: '#f1f5f9', borderRadius: 14, padding: 4,
                    }}>
                        <TouchableOpacity
                            style={{
                                flex: 1, paddingVertical: 10, borderRadius: 10, alignItems: 'center',
                                backgroundColor: activeTab === 'upcoming' ? '#fff' : 'transparent',
                                elevation: activeTab === 'upcoming' ? 2 : 0,
                            }}
                            onPress={() => setActiveTab('upcoming')}
                        >
                            <Text style={{ fontWeight: '700', fontSize: 14, color: activeTab === 'upcoming' ? '#1a56c4' : '#64748b' }}>
                                🔔 {t('reminder.upcoming')} ({upcomingVaccines.length})
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                flex: 1, paddingVertical: 10, borderRadius: 10, alignItems: 'center',
                                backgroundColor: activeTab === 'completed' ? '#fff' : 'transparent',
                                elevation: activeTab === 'completed' ? 2 : 0,
                            }}
                            onPress={() => setActiveTab('completed')}
                        >
                            <Text style={{ fontWeight: '700', fontSize: 14, color: activeTab === 'completed' ? '#10b981' : '#64748b' }}>
                                ✅ {t('reminder.completedTab')} ({completedVaccines.length})
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                        {displayList.length === 0 ? (
                            <View style={{ alignItems: 'center', padding: 40 }}>
                                <Text style={{ fontSize: 40, marginBottom: 12 }}>
                                    {activeTab === 'upcoming' ? '🎉' : '📋'}
                                </Text>
                                <Text style={{ color: '#64748b', textAlign: 'center', fontSize: 15 }}>
                                    {activeTab === 'upcoming' ? t('reminder.allDone') : t('reminder.noneCompleted')}
                                </Text>
                            </View>
                        ) : (
                            displayList.map(item => <ChildVaccineCard key={item._id} item={item} />)
                        )}
                        <View style={{ marginTop: 16, padding: 14, backgroundColor: '#fef2f2', borderRadius: 12 }}>
                            <Text style={{ color: '#991b1b', fontSize: 13, textAlign: 'center' }}>
                                🏥 {t('reminder.visitNote')}
                            </Text>
                        </View>
                    </ScrollView>
                </>
            ) : (
                /* ── NO CHILD: Mother's Vaccine Schedule with Done Status ── */
                <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

                    {/* Info Banner */}
                    <View style={{
                        backgroundColor: '#fffbeb', borderRadius: 14, padding: 16, marginBottom: 16,
                        borderLeftWidth: 4, borderLeftColor: '#d97706',
                    }}>
                        <Text style={{ color: '#92400e', fontWeight: '700', fontSize: 15, marginBottom: 4 }}>
                            👶 {t('reminder.noChildTitle')}
                        </Text>
                        <Text style={{ color: '#92400e', fontSize: 13, lineHeight: 20 }}>
                            {t('reminder.noChildDesc')}
                        </Text>
                        <TouchableOpacity
                            style={{ marginTop: 12, backgroundColor: '#d97706', borderRadius: 10, paddingVertical: 10, alignItems: 'center' }}
                            onPress={() => navigation.navigate('RegisterBaby')}
                        >
                            <Text style={{ color: '#fff', fontWeight: '700', fontSize: 14 }}>
                                + {t('reminder.registerChild')}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Progress bar for mother vaccines */}
                    <View style={{
                        backgroundColor: '#fff', borderRadius: 14, padding: 14, marginBottom: 16,
                        borderWidth: 1, borderColor: '#fce7f3',
                    }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                            <Text style={{ fontWeight: '700', color: '#be185d', fontSize: 14 }}>
                                💉 {t('reminder.motherProgress')}
                            </Text>
                            <Text style={{ fontWeight: '700', color: '#be185d', fontSize: 14 }}>
                                {motherDoneCount}/{MOTHER_VACCINES.length}
                            </Text>
                        </View>
                        <View style={{ backgroundColor: '#fce7f3', borderRadius: 8, height: 10 }}>
                            <View style={{
                                width: `${Math.round((motherDoneCount / MOTHER_VACCINES.length) * 100)}%`,
                                backgroundColor: '#be185d', borderRadius: 8, height: 10,
                            }} />
                        </View>
                        <Text style={{ color: '#9ca3af', fontSize: 12, marginTop: 6 }}>
                            {t('reminder.progressText', { percent: Math.round((motherDoneCount / MOTHER_VACCINES.length) * 100), remaining: MOTHER_VACCINES.length - motherDoneCount })}
                        </Text>
                    </View>

                    {/* Section Header */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 14 }}>
                        <View style={{ width: 4, height: 22, backgroundColor: '#be185d', borderRadius: 2, marginRight: 10 }} />
                        <Text style={{ fontSize: 16, fontWeight: '800', color: '#1e293b' }}>
                            {t('reminder.motherScheduleTitle')}
                        </Text>
                    </View>

                    {MOTHER_VACCINES.map(item => (
                        <MotherVaccineCard key={item.id} item={item} />
                    ))}

                    {/* Footer */}
                    <View style={{ marginTop: 8, padding: 14, backgroundColor: '#fef2f2', borderRadius: 12 }}>
                        <Text style={{ color: '#991b1b', fontSize: 13, textAlign: 'center' }}>
                            🏥 {t('reminder.visitNote')}
                        </Text>
                    </View>
                </ScrollView>
            )}
        </SafeAreaView>
    );
}

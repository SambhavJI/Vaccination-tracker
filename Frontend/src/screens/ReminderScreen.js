import React from 'react';
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { reminderStyles as styles } from '../styles/ReminderStyles';

const UPCOMING_VACCINES = [
    {
        id: '1',
        name: 'DPT-1 (Diphtheria, Pertussis, Tetanus)',
        age: '6 Weeks',
        dueDate: 'March 15, 2024',
        icon: 'shield',
        color: '#eff6ff',
        accent: '#3b82f6',
    },
    {
        id: '2',
        name: 'OPV-1 (Oral Polio Vaccine)',
        age: '6 Weeks',
        dueDate: 'March 15, 2024',
        icon: 'tint',
        color: '#ecfdf5',
        accent: '#10b981',
    },
    {
        id: '3',
        name: 'Hepatitis B-2',
        age: '6 Weeks',
        dueDate: 'March 15, 2024',
        icon: 'medkit',
        color: '#fff7ed',
        accent: '#f59e0b',
    },
    {
        id: '4',
        name: 'DPT-2',
        age: '10 Weeks',
        dueDate: 'April 10, 2024',
        icon: 'shield',
        color: '#eff6ff',
        accent: '#3b82f6',
    },
    {
        id: '5',
        name: 'OPV-2',
        age: '10 Weeks',
        dueDate: 'April 10, 2024',
        icon: 'tint',
        color: '#ecfdf5',
        accent: '#10b981',
    },
];

export default function ReminderScreen({ navigation }) {
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
                <Text style={styles.title}>Vaccination Reminders</Text>
                <Text style={styles.subtitle}>Stay updated with your child's health schedule</Text>
            </View>

            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                {UPCOMING_VACCINES.map((item) => (
                    <View key={item.id} style={styles.reminderCard}>
                        <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
                            <FontAwesome name={item.icon} size={20} color={item.accent} />
                        </View>

                        <View style={styles.infoContainer}>
                            <Text style={styles.vaccineName}>{item.name}</Text>
                            <View style={styles.dueContainer}>
                                <Text style={styles.dueLabel}>Due at {item.age}:</Text>
                                <Text style={styles.dueTime}>{item.dueDate}</Text>
                            </View>
                        </View>

                        <View style={[styles.statusBadge, { backgroundColor: item.color }]}>
                            <Text style={[styles.statusText, { color: item.accent }]}>Upcoming</Text>
                        </View>
                    </View>
                ))}

                <View style={{ marginTop: 20, padding: 16, backgroundColor: '#fef2f2', borderRadius: 12 }}>
                    <Text style={{ color: '#991b1b', fontSize: 13, textAlign: 'center' }}>
                        🏥 Please visit your nearest health center on the due date.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

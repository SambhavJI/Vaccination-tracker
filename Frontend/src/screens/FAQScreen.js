import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    StyleSheet
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function FAQScreen({ navigation }) {

    const [activeFilter, setActiveFilter] = useState("all");
    const [openIndex, setOpenIndex] = useState(null);

    const faqData = [
        { q: "How can a user register in the system?", a: "Fill signup form with name, email, phone, password.", category: "registration" },
        { q: "What information is required during registration?", a: "Name, email, phone number and password.", category: "registration" },
        { q: "Can I update my profile details?", a: "Yes, You can navigate to the Profile section from the bottom navigation bar. The Edit option is available in the top-right corner of the screen.", category: "registration" },
        { q: "How can I schedule a vaccination appointment?", a: "Select date and time slot from appointment section.", category: "appointment" },
        { q: "Can I reschedule my reminder?", a: "Yes, with the plus sign availabe in reminder section", category: "appointment" },
        { q: "Can I view my vaccination history?", a: "Yes, in dashboard.", category: "vaccination" },
        { q: "Are reminders provided for vaccines?", a: "Yes, notifications are sent.", category: "schedule" },
        { q: "Is user data secure?", a: "Yes, secured with authentication.", category: "general" },
        { q: "Is internet required?", a: "Yes, internet is required.", category: "general" },
    ];

    const filters = ["all", "registration", "appointment", "vaccination", "schedule", "general"];

    const filteredData = activeFilter === "all"
        ? faqData
        : faqData.filter(item => item.category === activeFilter);

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <FontAwesome name="chevron-left" size={16} color="#F43F8A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>FAQs</Text>
                <View style={{ width: 20 }} />
            </View>

            <ScrollView style={styles.container}>

                {/* Title */}
                <Text style={styles.title}>Frequently Asked Questions</Text>
                <Text style={styles.subtitle}>
                    Answers to common questions about Vaccination Tracker
                </Text>

                {/* Filters */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
                    {filters.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.filterBtn,
                                activeFilter === item && styles.activeFilter
                            ]}
                            onPress={() => {
                                setActiveFilter(item);
                                setOpenIndex(null); // Close accordion on filter change
                            }}
                        >
                            <Text style={[
                                styles.filterText,
                                activeFilter === item && styles.activeFilterText
                            ]}>
                                {item.charAt(0).toUpperCase() + item.slice(1)}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* FAQ List */}
                {filteredData.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.faqItem}
                        onPress={() => setOpenIndex(openIndex === index ? null : index)}
                    >
                        <View style={{ flex: 1 }}>
                            <Text style={styles.question}>
                                {index + 1}. {item.q}
                            </Text>

                            {openIndex === index && (
                                <Text style={styles.answer}>
                                    {item.a}
                                </Text>
                            )}
                        </View>

                        <Text style={styles.icon}>
                            {openIndex === index ? "-" : "+"}
                        </Text>
                    </TouchableOpacity>
                ))}

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFF0F5'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#FFD6E8'
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#3D1A26'
    },
    container: {
        padding: 16
    },
    title: {
        fontSize: 22,
        fontWeight: '800',
        color: '#3D1A26',
        marginBottom: 6
    },
    subtitle: {
        fontSize: 14,
        color: '#6B4C55',
        marginBottom: 16
    },
    filterContainer: {
        flexDirection: 'row',
        marginBottom: 16
    },
    filterBtn: {
        borderWidth: 1,
        borderColor: '#F43F8A',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        marginRight: 10
    },
    activeFilter: {
        backgroundColor: '#F43F8A'
    },
    filterText: {
        color: '#F43F8A'
    },
    activeFilterText: {
        color: '#fff'
    },
    faqItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    question: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333'
    },
    answer: {
        marginTop: 8,
        color: '#B91C1C',
        fontSize: 14
    },
    icon: {
        fontSize: 18,
        color: '#F43F8A',
        marginLeft: 10
    }
});

import React from 'react';
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

export default function TermsScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
            
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <FontAwesome name="chevron-left" size={14} color="#F43F8A" />
                    <Text style={styles.backText}>Back</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Terms and Conditions</Text>
                <View style={{ width: 60 }} /> {/* invisible element for balanced centering */}
            </View>

            {/* Content */}
            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.heroTitle}>
                    Maternal Health Care{'\n'}Monitoring System
                </Text>
                
                <Text style={styles.introText}>
                    The following Terms and Conditions govern the use of the Maternal Health Care Monitoring and Reminder System (“the Platform”). By registering, accessing, or using the Platform, the user agrees to comply with these Terms.
                </Text>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>1. Purpose of the Platform</Text>
                    <Text style={styles.paragraph}>
                        The Platform is a digital health monitoring and reminder system designed to assist pregnant women, parents, doctors, and administrators in managing maternal and child vaccination schedules and related health records.
                    </Text>
                    <Text style={styles.paragraph}>
                        The Platform is intended to provide organizational support and automated reminders. It does not function as a medical diagnostic or treatment system.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>2. Voluntary Registration and Consent</Text>
                    <Text style={styles.paragraph}>
                        Registration on the Platform requires submission of certain personal and medical details, including but not limited to:
                    </Text>
                    <View style={styles.bulletList}>
                        <Text style={styles.bulletItem}>• Name and contact information</Text>
                        <Text style={styles.bulletItem}>• Pregnancy-related data (LMP, Expected Due Date, trimester details)</Text>
                        <Text style={styles.bulletItem}>• Medical history and high-risk status</Text>
                        <Text style={styles.bulletItem}>• Vaccination records</Text>
                        <Text style={styles.bulletItem}>• Doctor or hospital information</Text>
                    </View>
                    <Text style={styles.paragraph}>
                        By submitting such information, the user confirms that:
                    </Text>
                    <View style={styles.bulletList}>
                        <Text style={styles.bulletItem}>• The information is provided voluntarily.</Text>
                        <Text style={styles.bulletItem}>• The information is accurate to the best of their knowledge.</Text>
                        <Text style={styles.bulletItem}>• They have authority and consent to enter data for any dependent individual (such as a newborn).</Text>
                        <Text style={styles.bulletItem}>• They understand that the data will be stored digitally for scheduling and reminder purposes.</Text>
                    </View>
                    <Text style={styles.paragraph}>
                        Use of the Platform constitutes informed consent for digital processing and storage of the submitted information.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>3. Nature of Medical Information</Text>
                    <Text style={styles.paragraph}>
                        The pregnancy guide, vaccination schedules, abnormal signs, and health-related content provided within the Platform are based on commonly available medical references and general healthcare guidelines.
                    </Text>
                    <Text style={styles.paragraph}>
                        The Platform:
                    </Text>
                    <View style={styles.bulletList}>
                        <Text style={styles.bulletItem}>• Does not provide medical diagnosis.</Text>
                        <Text style={styles.bulletItem}>• Does not prescribe treatment.</Text>
                        <Text style={styles.bulletItem}>• Does not replace professional medical consultation.</Text>
                    </View>
                    <Text style={styles.paragraph}>
                        Users must consult qualified healthcare professionals for all medical decisions.
                    </Text>
                    <Text style={styles.paragraph}>
                        The developers, project members, faculty supervisor, and institution shall not be responsible for any medical outcomes arising from reliance on the Platform.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>4. Automated Schedule and Reminder System</Text>
                    <Text style={styles.paragraph}>
                        The Platform automatically generates:
                    </Text>
                    <View style={styles.bulletList}>
                        <Text style={styles.bulletItem}>• Vaccination schedules</Text>
                        <Text style={styles.bulletItem}>• Trimester calculations</Text>
                        <Text style={styles.bulletItem}>• Reminder notifications (7 days before and on due date)</Text>
                    </View>
                    <Text style={styles.paragraph}>
                        These outputs are based entirely on user-entered data.
                    </Text>
                    <Text style={styles.paragraph}>
                        Reminder notifications may be delivered through:
                    </Text>
                    <View style={styles.bulletList}>
                        <Text style={styles.bulletItem}>• In-app alerts</Text>
                        <Text style={styles.bulletItem}>• Alarm notifications</Text>
                        <Text style={styles.bulletItem}>• SMS services</Text>
                    </View>
                    <Text style={styles.paragraph}>
                        Delivery of reminders depends on internet connectivity, device settings, server functionality, and third-party communication services. The Platform does not guarantee uninterrupted or error-free reminder delivery.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>5. User Responsibilities</Text>
                    <Text style={styles.paragraph}>Users agree to:</Text>
                    <View style={styles.bulletList}>
                        <Text style={styles.bulletItem}>• Enter accurate and complete information.</Text>
                        <Text style={styles.bulletItem}>• Maintain confidentiality of login credentials.</Text>
                        <Text style={styles.bulletItem}>• Not create false records.</Text>
                        <Text style={styles.bulletItem}>• Not attempt unauthorized access to system data.</Text>
                        <Text style={styles.bulletItem}>• Not use automated tools, bots, or scripts to manipulate the Platform.</Text>
                    </View>
                    <Text style={styles.paragraph}>
                        Users are responsible for verifying all medical dates and vaccination schedules with their healthcare provider.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>6. Data Storage and Security</Text>
                    <Text style={styles.paragraph}>
                        The Platform stores data in a structured digital database and implements authentication and access control mechanisms to protect user information.
                    </Text>
                    <Text style={styles.paragraph}>
                        While reasonable technical safeguards are applied, absolute data security cannot be guaranteed due to potential technical failures or cybersecurity risks.
                    </Text>
                    <Text style={styles.paragraph}>
                        The Platform shall not be held liable for data loss, unauthorized access, or system interruptions beyond reasonable control.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>7. Intellectual Property</Text>
                    <Text style={styles.paragraph}>
                        All system architecture, database structure, user interface design, workflow logic, and documentation belong to the project developers.
                    </Text>
                    <Text style={styles.paragraph}>
                        Users may not copy, reproduce, modify, reverse engineer, or commercially exploit any part of the Platform without permission.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>8. Limitation of Liability</Text>
                    <Text style={styles.paragraph}>
                        Under no circumstances shall the developers, project team members, faculty supervisor, institution, administrators, or affiliated individuals be liable for:
                    </Text>
                    <View style={styles.bulletList}>
                        <Text style={styles.bulletItem}>• Medical complications</Text>
                        <Text style={styles.bulletItem}>• Missed vaccinations</Text>
                        <Text style={styles.bulletItem}>• Health deterioration</Text>
                        <Text style={styles.bulletItem}>• Vaccine reactions</Text>
                        <Text style={styles.bulletItem}>• Incorrect schedule generation due to wrong input</Text>
                        <Text style={styles.bulletItem}>• Reminder delivery failure</Text>
                        <Text style={styles.bulletItem}>• Technical malfunctions</Text>
                        <Text style={styles.bulletItem}>• Indirect or consequential damages</Text>
                    </View>
                    <Text style={styles.paragraph}>
                        Use of the Platform is entirely at the user’s own discretion and risk.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>9. Suspension or Termination</Text>
                    <Text style={styles.paragraph}>
                        The Platform reserves the right to suspend or terminate access if a user:
                    </Text>
                    <View style={styles.bulletList}>
                        <Text style={styles.bulletItem}>• Violates these Terms</Text>
                        <Text style={styles.bulletItem}>• Misuses the system</Text>
                        <Text style={styles.bulletItem}>• Provides false or misleading information</Text>
                        <Text style={styles.bulletItem}>• Attempts to breach system security</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>10. Acceptance of Terms</Text>
                    <Text style={styles.paragraph}>
                        By creating an account or using the Platform, the user confirms that:
                    </Text>
                    <View style={styles.bulletList}>
                        <Text style={styles.bulletItem}>• They have read and understood these Terms and Conditions.</Text>
                        <Text style={styles.bulletItem}>• They voluntarily agree to comply with them.</Text>
                        <Text style={styles.bulletItem}>• They acknowledge that the Platform is a monitoring and reminder tool only.</Text>
                    </View>
                </View>

                <View style={styles.footerSpace} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFF0F5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#FFD6E8',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 60,
    },
    backText: {
        color: '#F43F8A',
        fontSize: 16,
        marginLeft: 4,
        fontWeight: '600',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#3D1A26',
    },
    scroll: {
        flex: 1,
    },
    content: {
        padding: 24,
    },
    heroTitle: {
        fontSize: 26,
        fontWeight: '800',
        color: '#3D1A26',
        marginBottom: 16,
        lineHeight: 34,
    },
    introText: {
        fontSize: 15,
        color: '#5C3D46',
        lineHeight: 24,
        marginBottom: 32,
        fontStyle: 'italic',
    },
    section: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#F43F8A',
        marginBottom: 12,
    },
    paragraph: {
        fontSize: 15,
        color: '#3D1A26',
        lineHeight: 24,
        marginBottom: 12,
    },
    bulletList: {
        marginBottom: 12,
        paddingLeft: 8,
    },
    bulletItem: {
        fontSize: 15,
        color: '#3D1A26',
        lineHeight: 24,
        marginBottom: 6,
    },
    footerSpace: {
        height: 40,
    }
});

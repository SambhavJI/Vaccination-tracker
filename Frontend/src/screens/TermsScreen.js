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
import { useTranslation } from 'react-i18next';
import LanguageToggle from '../components/LanguageToggle';

export default function TermsScreen({ navigation }) {
    const { t } = useTranslation();

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
                    <Text style={styles.backText}>{t('terms.back')}</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{t('terms.headerTitle')}</Text>
                <LanguageToggle />
            </View>

            {/* Content */}
            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.heroTitle}>
                    {t('terms.heroTitle')}
                </Text>

                <Text style={styles.introText}>
                    {t('terms.introText')}
                </Text>

                {/* Section 1 */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t('terms.section1Title')}</Text>
                    <Text style={styles.paragraph}>{t('terms.section1P1')}</Text>
                    <Text style={styles.paragraph}>{t('terms.section1P2')}</Text>
                </View>

                {/* Section 2 */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t('terms.section2Title')}</Text>
                    <Text style={styles.paragraph}>{t('terms.section2P1')}</Text>
                    <View style={styles.bulletList}>
                        <Text style={styles.bulletItem}>{t('terms.section2B1')}</Text>
                        <Text style={styles.bulletItem}>{t('terms.section2B2')}</Text>
                        <Text style={styles.bulletItem}>{t('terms.section2B3')}</Text>
                        <Text style={styles.bulletItem}>{t('terms.section2B4')}</Text>
                        <Text style={styles.bulletItem}>{t('terms.section2B5')}</Text>
                    </View>
                    <Text style={styles.paragraph}>{t('terms.section2P2')}</Text>
                    <View style={styles.bulletList}>
                        <Text style={styles.bulletItem}>{t('terms.section2B6')}</Text>
                        <Text style={styles.bulletItem}>{t('terms.section2B7')}</Text>
                        <Text style={styles.bulletItem}>{t('terms.section2B8')}</Text>
                        <Text style={styles.bulletItem}>{t('terms.section2B9')}</Text>
                    </View>
                    <Text style={styles.paragraph}>{t('terms.section2P3')}</Text>
                </View>

                {/* Section 3 */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t('terms.section3Title')}</Text>
                    <Text style={styles.paragraph}>{t('terms.section3P1')}</Text>
                    <Text style={styles.paragraph}>{t('terms.section3P2')}</Text>
                    <View style={styles.bulletList}>
                        <Text style={styles.bulletItem}>{t('terms.section3B1')}</Text>
                        <Text style={styles.bulletItem}>{t('terms.section3B2')}</Text>
                        <Text style={styles.bulletItem}>{t('terms.section3B3')}</Text>
                    </View>
                    <Text style={styles.paragraph}>{t('terms.section3P3')}</Text>
                    <Text style={styles.paragraph}>{t('terms.section3P4')}</Text>
                </View>

                {/* Section 4 */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t('terms.section4Title')}</Text>
                    <Text style={styles.paragraph}>{t('terms.section4P1')}</Text>
                    <View style={styles.bulletList}>
                        <Text style={styles.bulletItem}>{t('terms.section4B1')}</Text>
                        <Text style={styles.bulletItem}>{t('terms.section4B2')}</Text>
                        <Text style={styles.bulletItem}>{t('terms.section4B3')}</Text>
                    </View>
                    <Text style={styles.paragraph}>{t('terms.section4P2')}</Text>
                    <Text style={styles.paragraph}>{t('terms.section4P3')}</Text>
                    <View style={styles.bulletList}>
                        <Text style={styles.bulletItem}>{t('terms.section4B4')}</Text>
                        <Text style={styles.bulletItem}>{t('terms.section4B5')}</Text>
                        <Text style={styles.bulletItem}>{t('terms.section4B6')}</Text>
                    </View>
                    <Text style={styles.paragraph}>{t('terms.section4P4')}</Text>
                </View>

                {/* Section 5 */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t('terms.section5Title')}</Text>
                    <Text style={styles.paragraph}>{t('terms.section5P1')}</Text>
                    <View style={styles.bulletList}>
                        <Text style={styles.bulletItem}>{t('terms.section5B1')}</Text>
                        <Text style={styles.bulletItem}>{t('terms.section5B2')}</Text>
                        <Text style={styles.bulletItem}>{t('terms.section5B3')}</Text>
                        <Text style={styles.bulletItem}>{t('terms.section5B4')}</Text>
                        <Text style={styles.bulletItem}>{t('terms.section5B5')}</Text>
                    </View>
                    <Text style={styles.paragraph}>{t('terms.section5P2')}</Text>
                </View>

                {/* Section 6 */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t('terms.section6Title')}</Text>
                    <Text style={styles.paragraph}>{t('terms.section6P1')}</Text>
                    <Text style={styles.paragraph}>{t('terms.section6P2')}</Text>
                    <Text style={styles.paragraph}>{t('terms.section6P3')}</Text>
                </View>

                {/* Section 7 */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t('terms.section7Title')}</Text>
                    <Text style={styles.paragraph}>{t('terms.section7P1')}</Text>
                    <Text style={styles.paragraph}>{t('terms.section7P2')}</Text>
                </View>

                {/* Section 8 */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t('terms.section8Title')}</Text>
                    <Text style={styles.paragraph}>{t('terms.section8P1')}</Text>
                    <View style={styles.bulletList}>
                        <Text style={styles.bulletItem}>{t('terms.section8B1')}</Text>
                        <Text style={styles.bulletItem}>{t('terms.section8B2')}</Text>
                        <Text style={styles.bulletItem}>{t('terms.section8B3')}</Text>
                        <Text style={styles.bulletItem}>{t('terms.section8B4')}</Text>
                        <Text style={styles.bulletItem}>{t('terms.section8B5')}</Text>
                        <Text style={styles.bulletItem}>{t('terms.section8B6')}</Text>
                        <Text style={styles.bulletItem}>{t('terms.section8B7')}</Text>
                        <Text style={styles.bulletItem}>{t('terms.section8B8')}</Text>
                    </View>
                    <Text style={styles.paragraph}>{t('terms.section8P2')}</Text>
                </View>

                {/* Section 9 */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t('terms.section9Title')}</Text>
                    <Text style={styles.paragraph}>{t('terms.section9P1')}</Text>
                    <View style={styles.bulletList}>
                        <Text style={styles.bulletItem}>{t('terms.section9B1')}</Text>
                        <Text style={styles.bulletItem}>{t('terms.section9B2')}</Text>
                        <Text style={styles.bulletItem}>{t('terms.section9B3')}</Text>
                        <Text style={styles.bulletItem}>{t('terms.section9B4')}</Text>
                    </View>
                </View>

                {/* Section 10 */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t('terms.section10Title')}</Text>
                    <Text style={styles.paragraph}>{t('terms.section10P1')}</Text>
                    <View style={styles.bulletList}>
                        <Text style={styles.bulletItem}>{t('terms.section10B1')}</Text>
                        <Text style={styles.bulletItem}>{t('terms.section10B2')}</Text>
                        <Text style={styles.bulletItem}>{t('terms.section10B3')}</Text>
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

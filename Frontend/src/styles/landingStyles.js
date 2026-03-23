import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const landingStyles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    container: {
        flex: 1,
    },
    // Hero Section
    heroSection: {
        paddingTop: 40,
        paddingHorizontal: 24,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 5,
        marginBottom: 20,
        paddingBottom: 40,
    },
    badgeContainer: {
        backgroundColor: '#FEF2F2',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        marginBottom: 20,
    },
    badgeText: {
        color: '#EF4444',
        fontSize: 12,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    heroTitle: {
        fontSize: 32,
        fontWeight: '800',
        color: '#0F172A',
        textAlign: 'center',
        marginBottom: 16,
        lineHeight: 40,
    },
    highlight: {
        color: '#EC4899',
    },
    heroSubtitle: {
        fontSize: 15,
        color: '#64748B',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 30,
        paddingHorizontal: 10,
    },
    heroImageContainer: {
        width: width * 0.65,
        height: width * 0.65,
        borderRadius: (width * 0.65) / 2,
        backgroundColor: '#FDF2F8',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#EC4899',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.15,
        shadowRadius: 20,
        elevation: 8,
    },
    heroImage: {
        width: '85%',
        height: '85%',
    },
    // Features Section
    section: {
        paddingHorizontal: 24,
        paddingTop: 10,
        paddingBottom: 20,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#0F172A',
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    featureCard: {
        width: (width - 64) / 2, // 24 padding each side (48) + 16 gap = 64
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
        elevation: 2,
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    cardTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1E293B',
        marginBottom: 6,
    },
    cardText: {
        fontSize: 13,
        color: '#64748B',
        lineHeight: 18,
    },
    // Auth Section
    bottomContainer: {
        paddingHorizontal: 24,
        paddingTop: 10,
        paddingBottom: 40,
    },
    signupButton: {
        backgroundColor: '#EC4899',
        paddingVertical: 18,
        borderRadius: 16,
        alignItems: 'center',
        marginBottom: 16,
        shadowColor: '#EC4899',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 6,
    },
    signupButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    loginButton: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 18,
        borderRadius: 16,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#E2E8F0',
    },
    loginButtonText: {
        color: '#0F172A',
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    // Footer
    footer: {
        alignItems: 'center',
        marginTop: 24,
    },
    footerText: {
        fontSize: 12,
        color: '#94A3B8',
        marginBottom: 4,
        fontWeight: '500',
    },
    footerTextSmall: {
        fontSize: 10,
        color: '#CBD5E1',
    },
});

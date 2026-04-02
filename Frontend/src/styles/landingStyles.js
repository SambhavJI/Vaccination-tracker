import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// Pink Cosy Palette
// Primary:  #F43F8A (vibrant rose-pink)
// Soft bg:  #FFF0F5 (blush white)
// Card bg:  #FFFFFF
// Accent:   #FF82B2 (light candy pink)
// Text:     #3D1A26 (deep rose dark)
// Muted:    #A07080 (dusty rose)

export const landingStyles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFF0F5',
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
        shadowColor: '#F43F8A',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.12,
        shadowRadius: 16,
        elevation: 6,
        marginBottom: 20,
        paddingBottom: 40,
    },
    badgeContainer: {
        backgroundColor: '#FFD6E8',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        marginBottom: 20,
    },
    badgeText: {
        color: '#C2185B',
        fontSize: 12,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    heroTitle: {
        fontSize: 32,
        fontWeight: '800',
        color: '#3D1A26',
        textAlign: 'center',
        marginBottom: 16,
        lineHeight: 40,
    },
    highlight: {
        color: '#F43F8A',
    },
    heroSubtitle: {
        fontSize: 15,
        color: '#A07080',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 30,
        paddingHorizontal: 10,
    },
    heroImageContainer: {
        width: width * 0.65,
        height: width * 0.65,
        borderRadius: (width * 0.65) / 2,
        backgroundColor: '#FFD6E8',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#F43F8A',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
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
        color: '#3D1A26',
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    featureCard: {
        width: (width - 64) / 2,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#F43F8A',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#FFE4EF',
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
        color: '#3D1A26',
        marginBottom: 6,
    },
    cardText: {
        fontSize: 13,
        color: '#A07080',
        lineHeight: 18,
    },
    // Auth Section
    bottomContainer: {
        paddingHorizontal: 24,
        paddingTop: 10,
        paddingBottom: 40,
    },
    signupButton: {
        backgroundColor: '#F43F8A',
        paddingVertical: 18,
        borderRadius: 16,
        alignItems: 'center',
        marginBottom: 16,
        shadowColor: '#F43F8A',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.35,
        shadowRadius: 14,
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
        borderColor: '#FFB3D0',
    },
    loginButtonText: {
        color: '#F43F8A',
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
        color: '#C48BA0',
        marginBottom: 4,
        fontWeight: '500',
    },
    footerTextSmall: {
        fontSize: 10,
        color: '#DEB8C8',
    },
});

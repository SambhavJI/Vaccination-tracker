import { StyleSheet } from 'react-native';

export const profileStyles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFF0F5',
    },
    scroll: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 40,
    },

    // Header
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#FFD6E8',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 12,
        backgroundColor: '#FFF0F5',
        shadowColor: '#F43F8A',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    backText: {
        fontSize: 14,
        color: '#F43F8A',
        fontWeight: '700',
        marginLeft: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#3D1A26',
        marginLeft: 15,
    },

    // Hero Section
    heroSection: {
        alignItems: 'center',
        paddingVertical: 30,
        backgroundColor: '#fff',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        elevation: 4,
        shadowColor: '#F43F8A',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
    },
    avatarContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#FFD6E8',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
        borderWidth: 3,
        borderColor: '#F43F8A',
    },
    avatarEmoji: {
        fontSize: 50,
    },
    userName: {
        fontSize: 24,
        fontWeight: '800',
        color: '#3D1A26',
    },
    userTag: {
        fontSize: 14,
        color: '#F43F8A',
        fontWeight: '600',
        marginTop: 5,
    },

    // Section
    section: {
        marginTop: 25,
        paddingHorizontal: 20,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        gap: 10,
    },
    sectionIcon: {
        fontSize: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#3D1A26',
        letterSpacing: 0.5,
    },

    // Card
    card: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        elevation: 3,
        shadowColor: '#F43F8A',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        borderWidth: 1,
        borderColor: '#FFE4EF',
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#FFF0F5',
    },
    infoRowLast: {
        borderBottomWidth: 0,
        paddingBottom: 0,
    },
    label: {
        fontSize: 14,
        color: '#C48BA0',
        fontWeight: '500',
        flex: 1,
    },
    value: {
        fontSize: 14,
        color: '#3D1A26',
        fontWeight: '600',
        flex: 1.5,
        textAlign: 'right',
    },

    // Badges for specific info
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
        backgroundColor: '#FFD6E8',
    },
    statusText: {
        fontSize: 12,
        color: '#F43F8A',
        fontWeight: '700',
    },
    highRiskBadge: {
        backgroundColor: '#ffebee',
    },
    highRiskText: {
        color: '#d32f2f',
    }
});

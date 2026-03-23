import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get('window');

export const AfterLoginStyles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fdf6f0', // Soft creamy peach
    },
    scroll: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },

    // ── HERO HEADER ──
    heroContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
        marginTop: 10,
    },
    heroEmoji: {
        fontSize: 44,
        marginRight: 15,
    },
    welcomeText: {
        fontSize: 16,
        color: '#8c7662',
        fontWeight: '500',
    },
    userName: {
        fontSize: 26,
        fontWeight: '800',
        color: '#4a3f35',
    },

    // ── CARD BASE ──
    card: {
        backgroundColor: '#fff',
        borderRadius: 24,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#4a3f35',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
        elevation: 8,
        borderWidth: 1,
        borderColor: '#f2ece4',
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginLeft: 12,
    },
    numberBadge: {
        width: 36,
        height: 36,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    numberText: {
        fontSize: 18,
    },
    divider: {
        height: 1,
        width: '100%',
        marginBottom: 20,
        opacity: 0.3,
    },

    // ── CHILD CARD ──
    childCard: {
        borderColor: '#b2ddd0',
        backgroundColor: '#f4faf8',
    },
    childInfoGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    childInfoItem: {
        width: '48%',
        marginBottom: 15,
    },
    childInfoLabel: {
        fontSize: 12,
        color: '#6e8c83',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 4,
    },
    childInfoValue: {
        fontSize: 15,
        fontWeight: '700',
        color: '#2d3a36',
    },

    // ── VACCINE CARD ──
    vaccineCard: {
        borderColor: '#cad6ef',
        backgroundColor: '#f5f8ff',
    },
    vaccineRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    vaccineName: {
        fontSize: 22,
        fontWeight: '800',
        color: '#1a3b7a',
    },
    dueBadge: {
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        marginTop: 6,
        alignSelf: 'flex-start',
        borderWidth: 1,
        borderColor: '#d0d9ec',
    },
    dueText: {
        fontSize: 13,
        fontWeight: '700',
        color: '#1a56c4',
    },
    markDoneButton: {
        backgroundColor: '#1a56c4',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 14,
        shadowColor: '#1a56c4',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    markDoneText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 14,
    },

    // ── PROGRESS CARD ──
    progressCard: {
        borderColor: '#f2d1e5',
        backgroundColor: '#fffafc',
    },
    progressRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 12,
    },
    progressFraction: {
        fontSize: 28,
        fontWeight: '900',
        color: '#702255',
    },
    progressPercent: {
        fontSize: 14,
        fontWeight: '700',
        color: '#a0307a',
        backgroundColor: '#fcecf6',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    progressBarBg: {
        height: 12,
        backgroundColor: '#f2d1e5',
        borderRadius: 6,
        overflow: 'hidden',
        marginBottom: 10,
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#a0307a',
        borderRadius: 6,
    },
    progressSubText: {
        fontSize: 13,
        color: '#8c5d7a',
        fontWeight: '500',
    },

    // ── SCHEDULE TABLE ──
    sectionLabel: {
        fontSize: 18,
        fontWeight: '800',
        color: '#4a3f35',
        marginTop: 10,
        marginBottom: 15,
    },
    tableHeader: {
        flexDirection: 'row',
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f2d9c8',
    },
    tableHeaderCell: {
        flex: 1,
        fontSize: 13,
        fontWeight: '700',
        color: '#8c7662',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    tableRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#fcf3ed',
    },
    tableRowEven: {
        // backgroundColor: '#fdf9f6',
    },
    tableRowLast: {
        borderBottomWidth: 0,
    },
    tableCell: {
        flex: 1,
        fontSize: 14,
        fontWeight: '600',
        color: '#4a3f35',
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        alignSelf: 'flex-start',
    },
    statusBadgePending: {
        backgroundColor: '#fff4e6',
    },
    statusBadgeDone: {
        backgroundColor: '#e6fcf5',
    },
    statusText: {
        fontSize: 12,
        fontWeight: '700',
    },
    statusPending: {
        color: '#d9480f',
    },
    statusDone: {
        color: '#087f5b',
    },

    // ── LOGOUT ──
    logoutButton: {
        flexDirection: 'row',
        backgroundColor: '#ff6b6b',
        padding: 16,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        shadowColor: '#ff6b6b',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    logoutText: {
        color: '#fff',
        fontWeight: '700',
        marginLeft: 10,
        fontSize: 16,
    },

    // ── BOTTOM NAV ──
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 70,
        borderTopWidth: 1,
        borderTopColor: '#f2ece4',
        paddingBottom: Platform.OS === 'ios' ? 20 : 0,
    },
    navItem: {
        alignItems: 'center',
        justifyContent: 'center',
        width: width / 4,
    },
    navText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#6e6155',
        marginTop: 4,
    },
});

export default AfterLoginStyles;

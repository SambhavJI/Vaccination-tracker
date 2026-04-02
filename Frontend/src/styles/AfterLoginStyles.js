import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get('window');

// Pink Cosy Palette
// Primary:    #F43F8A (vibrant rose-pink)
// Soft bg:    #FFF0F5 (blush white)
// Card bg:    #FFFFFF
// Accent:     #FF82B2 (light candy pink)
// Deep text:  #3D1A26 (dark rose)
// Muted:      #A07080 (dusty rose)
// Border:     #FFD6E8 (light pink border)

export const AfterLoginStyles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFF0F5',
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
        color: '#C48BA0',
        fontWeight: '500',
    },
    userName: {
        fontSize: 26,
        fontWeight: '800',
        color: '#3D1A26',
    },

    // ── CARD BASE ──
    card: {
        backgroundColor: '#fff',
        borderRadius: 24,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#F43F8A',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 16,
        elevation: 6,
        borderWidth: 1,
        borderColor: '#FFE4EF',
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
        borderColor: '#FFD6E8',
        backgroundColor: '#FFF7FB',
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
        color: '#C48BA0',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 4,
    },
    childInfoValue: {
        fontSize: 15,
        fontWeight: '700',
        color: '#3D1A26',
    },

    // ── VACCINE CARD ──
    vaccineCard: {
        borderColor: '#FFB3D0',
        backgroundColor: '#FFF0F7',
    },
    vaccineRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    vaccineName: {
        fontSize: 22,
        fontWeight: '800',
        color: '#C2185B',
    },
    dueBadge: {
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        marginTop: 6,
        alignSelf: 'flex-start',
        borderWidth: 1,
        borderColor: '#FFB3D0',
    },
    dueText: {
        fontSize: 13,
        fontWeight: '700',
        color: '#E91E8C',
    },
    markDoneButton: {
        backgroundColor: '#F43F8A',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 14,
        shadowColor: '#F43F8A',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 10,
        elevation: 4,
    },
    markDoneText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 14,
    },

    // ── PROGRESS CARD ──
    progressCard: {
        borderColor: '#FFD6E8',
        backgroundColor: '#FFF7FB',
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
        color: '#C2185B',
    },
    progressPercent: {
        fontSize: 14,
        fontWeight: '700',
        color: '#F43F8A',
        backgroundColor: '#FFD6E8',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    progressBarBg: {
        height: 12,
        backgroundColor: '#FFD6E8',
        borderRadius: 6,
        overflow: 'hidden',
        marginBottom: 10,
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#F43F8A',
        borderRadius: 6,
    },
    progressSubText: {
        fontSize: 13,
        color: '#C48BA0',
        fontWeight: '500',
    },

    // ── SCHEDULE TABLE ──
    sectionLabel: {
        fontSize: 18,
        fontWeight: '800',
        color: '#3D1A26',
        marginTop: 10,
        marginBottom: 15,
    },
    tableHeader: {
        flexDirection: 'row',
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#FFD6E8',
    },
    tableHeaderCell: {
        flex: 1,
        fontSize: 13,
        fontWeight: '700',
        color: '#C48BA0',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    tableRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#FFE4EF',
    },
    tableRowEven: {},
    tableRowLast: {
        borderBottomWidth: 0,
    },
    tableCell: {
        flex: 1,
        fontSize: 14,
        fontWeight: '600',
        color: '#3D1A26',
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        alignSelf: 'flex-start',
    },
    statusBadgePending: {
        backgroundColor: '#FFE4EF',
    },
    statusBadgeDone: {
        backgroundColor: '#e6fcf5',
    },
    statusText: {
        fontSize: 12,
        fontWeight: '700',
    },
    statusPending: {
        color: '#C2185B',
    },
    statusDone: {
        color: '#087f5b',
    },

    // ── LOGOUT ──
    logoutButton: {
        flexDirection: 'row',
        backgroundColor: '#F43F8A',
        padding: 16,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        shadowColor: '#F43F8A',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 10,
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
        borderTopColor: '#FFE4EF',
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
        color: '#C48BA0',
        marginTop: 4,
    },
});

export default AfterLoginStyles;

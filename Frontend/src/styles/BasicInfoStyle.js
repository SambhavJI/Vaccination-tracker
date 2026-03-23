import { StyleSheet } from 'react-native';

export const basicInfoStyles = StyleSheet.create({

    // ─── LAYOUT ──────────────────────────────────────────────────────
    safeArea: {
        flex: 1,
        backgroundColor: '#fdf6f0',
    },
    scroll: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 48,
    },

    // ─── HEADER ──────────────────────────────────────────────────────
    header: {
        paddingTop: 15,
        paddingHorizontal: 20,
        paddingBottom: 10,
        backgroundColor: '#fdf6f0',
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        borderRadius: 12,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    backText: {
        fontSize: 14,
        color: '#e8703a',
        fontWeight: '700',
        marginLeft: 6,
    },

    // ─── HERO ─────────────────────────────────────────────────────────
    heroContainer: {
        alignItems: 'center',
        paddingVertical: 40,
        paddingHorizontal: 24,
        backgroundColor: '#fff5ee',
        borderBottomWidth: 1,
        borderBottomColor: '#f2d9c8',
        marginBottom: 8,
    },
    heroEmoji: {
        fontSize: 56,
        marginBottom: 12,
    },
    heroTitle: {
        fontSize: 28,
        fontWeight: '800',
        color: '#3b1a08',
        letterSpacing: 0.4,
        textAlign: 'center',
    },
    heroSubtitle: {
        fontSize: 13,
        color: '#8a5c42',
        textAlign: 'center',
        marginTop: 8,
        lineHeight: 20,
        paddingHorizontal: 20,
    },
    heroPill: {
        marginTop: 16,
        backgroundColor: '#e8703a',
        paddingHorizontal: 20,
        paddingVertical: 7,
        borderRadius: 22,
    },
    heroPillText: {
        color: '#fff',
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 1,
        textTransform: 'uppercase',
    },

    // ─── SECTION LABEL ───────────────────────────────────────────────
    sectionLabel: {
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        color: '#a0856e',
        marginHorizontal: 20,
        marginTop: 28,
        marginBottom: 4,
    },

    // ─── CARD ─────────────────────────────────────────────────────────
    card: {
        marginHorizontal: 16,
        marginTop: 12,
        borderRadius: 20,
        borderWidth: 1.5,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 4,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 18,
        paddingTop: 18,
        paddingBottom: 12,
        gap: 10,
    },
    numberBadge: {
        width: 32,
        height: 32,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    numberText: {
        color: '#fff',
        fontSize: 11,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
    cardIcon: {
        fontSize: 22,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '700',
        flex: 1,
        letterSpacing: 0.1,
        lineHeight: 22,
    },

    // ─── URGENT BANNER ───────────────────────────────────────────────
    urgentBanner: {
        marginHorizontal: 18,
        marginBottom: 10,
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 14,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    urgentText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 0.3,
    },

    // ─── DIVIDER ──────────────────────────────────────────────────────
    divider: {
        height: 1,
        marginHorizontal: 18,
        marginBottom: 14,
    },

    // ─── LIST ITEMS ───────────────────────────────────────────────────
    itemsContainer: {
        paddingHorizontal: 18,
        paddingBottom: 20,
        gap: 10,
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 10,
    },
    dot: {
        width: 7,
        height: 7,
        borderRadius: 4,
        marginTop: 7,
        flexShrink: 0,
    },
    itemText: {
        fontSize: 14,
        color: '#2c1a0e',
        lineHeight: 22,
        flex: 1,
    },

    // ─── FOOTER ───────────────────────────────────────────────────────
    footer: {
        alignItems: 'center',
        marginTop: 36,
        marginHorizontal: 16,
        paddingVertical: 30,
        paddingHorizontal: 24,
        backgroundColor: '#fff5ee',
        borderRadius: 22,
        borderWidth: 1.5,
        borderColor: '#f2d9c8',
    },
    footerHeart: {
        fontSize: 30,
        marginBottom: 8,
    },
    footerTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#3b1a08',
        letterSpacing: 0.3,
    },
    footerSub: {
        fontSize: 12,
        color: '#8a5c42',
        marginTop: 6,
        textAlign: 'center',
        lineHeight: 18,
    },
});

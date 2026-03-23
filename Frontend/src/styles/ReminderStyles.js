import { StyleSheet, Platform } from 'react-native';

export const reminderStyles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    header: {
        paddingTop: Platform.OS === 'ios' ? 20 : 40,
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 12,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        alignSelf: 'flex-start',
        marginBottom: 16,
    },
    backText: {
        fontSize: 14,
        color: '#3b82f6',
        fontWeight: '700',
        marginLeft: 8,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#1e293b',
    },
    subtitle: {
        fontSize: 14,
        color: '#64748b',
        marginTop: 4,
    },
    scroll: {
        flex: 1,
    },
    content: {
        padding: 20,
    },
    reminderCard: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#f1f5f9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    infoContainer: {
        flex: 1,
    },
    vaccineName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#334155',
    },
    dueContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    dueLabel: {
        fontSize: 12,
        color: '#64748b',
        marginRight: 8,
    },
    dueTime: {
        fontSize: 12,
        fontWeight: '600',
        color: '#ef4444',
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    statusText: {
        fontSize: 10,
        fontWeight: '700',
        textTransform: 'uppercase',
    }
});

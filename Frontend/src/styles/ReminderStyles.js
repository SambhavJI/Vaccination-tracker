import { StyleSheet, Platform } from 'react-native';

export const reminderStyles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFF0F5',
    },
    header: {
        paddingTop: Platform.OS === 'ios' ? 20 : 40,
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#FFD6E8',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 12,
        backgroundColor: '#FFE4EF',
        shadowColor: '#F43F8A',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        alignSelf: 'flex-start',
        marginBottom: 16,
    },
    backText: {
        fontSize: 14,
        color: '#F43F8A',
        fontWeight: '700',
        marginLeft: 8,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#3D1A26',
    },
    subtitle: {
        fontSize: 14,
        color: '#C48BA0',
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
        borderColor: '#FFE4EF',
        shadowColor: '#F43F8A',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
        backgroundColor: '#FFD6E8',
    },
    infoContainer: {
        flex: 1,
    },
    vaccineName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#3D1A26',
    },
    dueContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    dueLabel: {
        fontSize: 12,
        color: '#C48BA0',
        marginRight: 8,
    },
    dueTime: {
        fontSize: 12,
        fontWeight: '600',
        color: '#F43F8A',
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        backgroundColor: '#FFD6E8',
    },
    statusText: {
        fontSize: 10,
        fontWeight: '700',
        textTransform: 'uppercase',
        color: '#F43F8A',
    }
});

import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

export default function LanguageToggle() {
    const { i18n } = useTranslation();
    const isHindi = i18n.language === 'hi';

    const toggleLanguage = () => {
        i18n.changeLanguage(isHindi ? 'en' : 'hi');
    };

    return (
        <TouchableOpacity onPress={toggleLanguage} style={styles.toggle} activeOpacity={0.8}>
            <View style={[styles.pill, isHindi && styles.pillHindi]}>
                <View style={[styles.option, !isHindi && styles.activeOption]}>
                    <Text style={[styles.optionText, !isHindi && styles.activeText]}>EN</Text>
                </View>
                <View style={[styles.option, isHindi && styles.activeOption]}>
                    <Text style={[styles.optionText, isHindi && styles.activeText]}>हि</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    toggle: {
        alignSelf: 'flex-end',
        marginBottom: 8,
    },
    pill: {
        flexDirection: 'row',
        backgroundColor: '#FFE4EF',
        borderRadius: 20,
        padding: 3,
        borderWidth: 1,
        borderColor: '#FFB8D4',
    },
    pillHindi: {
        borderColor: '#F43F8A',
    },
    option: {
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 16,
    },
    activeOption: {
        backgroundColor: '#F43F8A',
    },
    optionText: {
        fontSize: 13,
        fontWeight: '700',
        color: '#C48BA0',
    },
    activeText: {
        color: '#ffffff',
    },
});

import React, { useRef, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    SafeAreaView,
    StatusBar,
    Animated,
    TouchableOpacity,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { SECTION_KEYS } from "../data/BasicInfo";
import { basicInfoStyles as styles } from "../styles/BasicInfoStyle";
import { useTranslation } from 'react-i18next';
import LanguageToggle from '../components/LanguageToggle';

function AnimatedCard({ sectionKey, index }) {
    const { t } = useTranslation();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(30)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                delay: index * 80,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 500,
                delay: index * 80,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const title = t(`basicInfoData.${sectionKey.key}.title`);
    const urgentText = t(`basicInfoData.${sectionKey.key}.urgentText`);
    const items = [];
    for (let i = 1; i <= sectionKey.itemCount; i++) {
        items.push(t(`basicInfoData.${sectionKey.key}.i${i}`));
    }

    return (
        <Animated.View
            style={[
                styles.card,
                {
                    backgroundColor: sectionKey.color,
                    borderColor: sectionKey.border,
                    opacity: fadeAnim,
                    transform: [{ translateY: slideAnim }],
                },
            ]}
        >
            {/* Card Header */}
            <View style={styles.cardHeader}>
                <View style={[styles.numberBadge, { backgroundColor: sectionKey.accent }]}>
                    <Text style={styles.numberText}>{sectionKey.number}</Text>
                </View>
                <Text style={styles.cardIcon}>{sectionKey.icon}</Text>
                <Text style={[styles.cardTitle, { color: sectionKey.accent }]}>
                    {title}
                </Text>
            </View>

            {/* Urgent Banner */}
            {sectionKey.urgent && (
                <View style={[styles.urgentBanner, { backgroundColor: sectionKey.accent }]}>
                    <Text style={styles.urgentText}>{urgentText}</Text>
                </View>
            )}

            {/* Divider */}
            <View style={[styles.divider, { backgroundColor: sectionKey.border }]} />

            {/* Items */}
            <View style={styles.itemsContainer}>
                {items.map((item, i) => (
                    <View key={i} style={styles.itemRow}>
                        <View style={[styles.dot, { backgroundColor: sectionKey.accent }]} />
                        <Text style={styles.itemText}>{item}</Text>
                    </View>
                ))}
            </View>
        </Animated.View>
    );
}

export default function BasicInfoScreen({ navigation }) {
    const { t } = useTranslation();
    const headerFade = useRef(new Animated.Value(0)).current;
    const headerSlide = useRef(new Animated.Value(-20)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(headerFade, {
                toValue: 1,
                duration: 700,
                useNativeDriver: true,
            }),
            Animated.timing(headerSlide, {
                toValue: 0,
                duration: 700,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#fdf6f0" />

            {/* Header with Back Button */}
            <View style={[styles.header, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <FontAwesome name="chevron-left" size={14} color="#e8703a" />
                    <Text style={styles.backText}>{t('basicInfo.back')}</Text>
                </TouchableOpacity>
                <LanguageToggle />
            </View>

            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Hero Header */}
                <Animated.View
                    style={[
                        styles.heroContainer,
                        {
                            opacity: headerFade,
                            transform: [{ translateY: headerSlide }],
                        },
                    ]}
                >
                    <Text style={styles.heroEmoji}>🤱</Text>
                    <Text style={styles.heroTitle}>{t('basicInfo.title')}</Text>
                    <Text style={styles.heroSubtitle}>
                        {t('basicInfo.subtitle')}
                    </Text>
                    <View style={styles.heroPill}>
                        <Text style={styles.heroPillText}>{t('basicInfo.essentialTopics')}</Text>
                    </View>
                </Animated.View>

                {SECTION_KEYS.map((sk, idx) => (
                    <AnimatedCard key={sk.key} sectionKey={sk} index={idx} />
                ))}

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerHeart}>💗</Text>
                    <Text style={styles.footerTitle}>{t('basicInfo.footerTitle')}</Text>
                    <Text style={styles.footerSub}>
                        {t('basicInfo.footerSub')}
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

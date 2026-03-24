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
import { SECTIONS } from "../data/BasicInfo";
import { basicInfoStyles as styles } from "../styles/BasicInfoStyle";

function AnimatedCard({ section, index }) {
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

    return (
        <Animated.View
            style={[
                styles.card,
                {
                    backgroundColor: section.color,
                    borderColor: section.border,
                    opacity: fadeAnim,
                    transform: [{ translateY: slideAnim }],
                },
            ]}
        >
            {/* Card Header */}
            <View style={styles.cardHeader}>
                <View style={[styles.numberBadge, { backgroundColor: section.accent }]}>
                    <Text style={styles.numberText}>{section.number}</Text>
                </View>
                <Text style={styles.cardIcon}>{section.icon}</Text>
                <Text style={[styles.cardTitle, { color: section.accent }]}>
                    {section.title}
                </Text>
            </View>

            {/* Urgent Banner */}
            {section.urgent && (
                <View style={[styles.urgentBanner, { backgroundColor: section.accent }]}>
                    <Text style={styles.urgentText}>⚡ Seek Immediate Medical Help</Text>
                </View>
            )}

            {/* Divider */}
            <View style={[styles.divider, { backgroundColor: section.border }]} />

            {/* Items */}
            <View style={styles.itemsContainer}>
                {section.items.map((item, i) => (
                    <View key={i} style={styles.itemRow}>
                        <View style={[styles.dot, { backgroundColor: section.accent }]} />
                        <Text style={styles.itemText}>{item}</Text>
                    </View>
                ))}
            </View>
        </Animated.View>
    );
}

export default function BasicInfoScreen({ navigation }) {
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
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <FontAwesome name="chevron-left" size={14} color="#e8703a" />
                    <Text style={styles.backText}>Basic info</Text>
                </TouchableOpacity>
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
                    <Text style={styles.heroTitle}>Pregnancy Guide</Text>
                    <Text style={styles.heroSubtitle}>
                        Normal & abnormal signs, baby health, and month-wise diet
                    </Text>
                    <View style={styles.heroPill}>
                        <Text style={styles.heroPillText}>13 Essential Topics</Text>
                    </View>
                </Animated.View>

                {/* Section Group Labels */}

                <AnimatedCard section={SECTIONS[0]} index={0} />
                <AnimatedCard section={SECTIONS[1]} index={1} />

                <AnimatedCard section={SECTIONS[2]} index={2} />
                <AnimatedCard section={SECTIONS[3]} index={3} />

                <AnimatedCard section={SECTIONS[4]} index={4} />
                <AnimatedCard section={SECTIONS[5]} index={5} />

                <AnimatedCard section={SECTIONS[6]} index={6} />
                <AnimatedCard section={SECTIONS[7]} index={7} />

                <AnimatedCard section={SECTIONS[8]} index={8} />
                <AnimatedCard section={SECTIONS[9]} index={9} />
                <AnimatedCard section={SECTIONS[10]} index={10} />
                <AnimatedCard section={SECTIONS[11]} index={11} />
                <AnimatedCard section={SECTIONS[12]} index={12} />

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerHeart}>💗</Text>
                    <Text style={styles.footerTitle}>Healthy Mom · Healthy Baby</Text>
                    <Text style={styles.footerSub}>
                        Always consult your doctor for personalized advice.
                        {"\n"}
                        Never take any medication without a prescription or professional guidance,
                        as it may lead to unwanted or harmful consequences for you or your baby.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

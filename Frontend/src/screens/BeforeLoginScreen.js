import React, { useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { landingStyles } from '../styles/landingStyles';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import LanguageToggle from '../components/LanguageToggle';

export default function BeforeLoginScreen({ navigation }) {
    const { t } = useTranslation();

    useEffect(() => {
        const checkAuth = async () => {
            const token = await AsyncStorage.getItem('userToken');
            if (token) navigation.replace('AfterLogin');
        };
        checkAuth();
    }, [navigation]);

    return (
        <SafeAreaView style={landingStyles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFF0F5" />
            <ScrollView style={landingStyles.container} showsVerticalScrollIndicator={false} bounces={false}>
                {/* Language Toggle */}
                <View style={{ paddingHorizontal: 20, paddingTop: 12 }}>
                    <LanguageToggle />
                </View>

                {/* HERO SECTION */}
                <View style={landingStyles.heroSection}>
                    <Text style={landingStyles.heroTitle}>
                        {t('beforeLogin.heroTitle')}<Text style={landingStyles.highlight}>{t('beforeLogin.heroHighlight')}</Text>
                    </Text>
                    <Text style={landingStyles.heroSubtitle}>
                        {t('beforeLogin.heroSubtitle')}
                    </Text>

                    <View style={landingStyles.heroImageContainer}>
                        <Image
                            source={require('../../assets/images/hero.png')}
                            style={landingStyles.heroImage}
                            resizeMode="contain"
                        />
                    </View>
                </View>

                {/* FEATURES SECTION */}
                <View style={landingStyles.section}>
                    <View style={landingStyles.sectionHeader}>
                        <Text style={landingStyles.sectionTitle}>{t('beforeLogin.whyTrust')}</Text>
                    </View>

                    <View style={landingStyles.gridContainer}>
                        {/* Card 1 */}
                        <View style={landingStyles.featureCard}>
                            <View style={[landingStyles.iconContainer, { backgroundColor: '#FFD6E8' }]}>
                                <Feather name="bell" size={20} color="#F43F8A" />
                            </View>
                            <Text style={landingStyles.cardTitle}>{t('beforeLogin.smartAlerts')}</Text>
                            <Text style={landingStyles.cardText}>{t('beforeLogin.smartAlertsDesc')}</Text>
                        </View>

                        {/* Card 2 */}
                        <View style={landingStyles.featureCard}>
                            <View style={[landingStyles.iconContainer, { backgroundColor: '#FFE9F3' }]}>
                                <Feather name="trending-up" size={20} color="#E91E8C" />
                            </View>
                            <Text style={landingStyles.cardTitle}>{t('beforeLogin.growthTracking')}</Text>
                            <Text style={landingStyles.cardText}>{t('beforeLogin.growthTrackingDesc')}</Text>
                        </View>

                        {/* Card 3 */}
                        <View style={landingStyles.featureCard}>
                            <View style={[landingStyles.iconContainer, { backgroundColor: '#FFF0F5' }]}>
                                <MaterialCommunityIcons name="book-open-page-variant-outline" size={22} color="#FF82B2" />
                            </View>
                            <Text style={landingStyles.cardTitle}>{t('beforeLogin.basicInfo')}</Text>
                            <Text style={landingStyles.cardText}>{t('beforeLogin.basicInfoDesc')}</Text>
                        </View>

                        {/* Card 4 */}
                        <View style={landingStyles.featureCard}>
                            <View style={[landingStyles.iconContainer, { backgroundColor: '#FFD6E8' }]}>
                                <Feather name="lock" size={20} color="#F43F8A" />
                            </View>
                            <Text style={landingStyles.cardTitle}>{t('beforeLogin.secureData')}</Text>
                            <Text style={landingStyles.cardText}>{t('beforeLogin.secureDataDesc')}</Text>
                        </View>
                    </View>
                </View>

                {/* CTA SECTION - Login and Sign Up Buttons */}
                <View style={landingStyles.bottomContainer}>
                    <TouchableOpacity
                        style={landingStyles.signupButton}
                        onPress={() => navigation.navigate('SignUp')}
                        activeOpacity={0.8}
                    >
                        <Text style={landingStyles.signupButtonText}>{t('beforeLogin.createAccount')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={landingStyles.loginButton}
                        onPress={() => navigation.navigate('Login')}
                        activeOpacity={0.6}
                    >
                        <Text style={landingStyles.loginButtonText}>{t('beforeLogin.logIn')}</Text>
                    </TouchableOpacity>

                    {/* FOOTER */}
                    <View style={landingStyles.footer}>
                        <Text style={landingStyles.footerText}>{t('beforeLogin.dataSecured')}</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Terms')} activeOpacity={0.7}>
                            <Text style={[landingStyles.footerText, { textDecorationLine: 'underline' }]}>{t('beforeLogin.termsAndConditions')}</Text>
                        </TouchableOpacity>
                        <Text style={landingStyles.footerTextSmall}>{t('beforeLogin.copyright')}</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

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

export default function BeforeLoginScreen({ navigation }) {
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
                {/* HERO SECTION */}
                <View style={landingStyles.heroSection}>
                    {/* Removed Badge */}
                    <Text style={landingStyles.heroTitle}>
                        Track Your Baby's{'\n'}Journey with <Text style={landingStyles.highlight}>Confidence</Text>
                    </Text>
                    <Text style={landingStyles.heroSubtitle}>
                        Never miss a vaccine. Get timely reminders, expert guidance, and growth tracking — all in one modern app.
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
                        <Text style={landingStyles.sectionTitle}>Why Mothers Trust Us</Text>
                    </View>

                    <View style={landingStyles.gridContainer}>
                        {/* Card 1 */}
                        <View style={landingStyles.featureCard}>
                            <View style={[landingStyles.iconContainer, { backgroundColor: '#FFD6E8' }]}>
                                <Feather name="bell" size={20} color="#F43F8A" />
                            </View>
                            <Text style={landingStyles.cardTitle}>Smart Alerts</Text>
                            <Text style={landingStyles.cardText}>Timely reminders for upcoming vaccines.</Text>
                        </View>

                        {/* Card 2 */}
                        <View style={landingStyles.featureCard}>
                            <View style={[landingStyles.iconContainer, { backgroundColor: '#FFE9F3' }]}>
                                <Feather name="trending-up" size={20} color="#E91E8C" />
                            </View>
                            <Text style={landingStyles.cardTitle}>Growth Tracking</Text>
                            <Text style={landingStyles.cardText}>Monitor your baby's development.</Text>
                        </View>

                        {/* Card 3 */}
                        <View style={landingStyles.featureCard}>
                            <View style={[landingStyles.iconContainer, { backgroundColor: '#FFF0F5' }]}>
                                <MaterialCommunityIcons name="book-open-page-variant-outline" size={22} color="#FF82B2" />
                            </View>
                            <Text style={landingStyles.cardTitle}>Basic Info</Text>
                            <Text style={landingStyles.cardText}>Essential guides for your baby's health.</Text>
                        </View>

                        {/* Card 4 */}
                        <View style={landingStyles.featureCard}>
                            <View style={[landingStyles.iconContainer, { backgroundColor: '#FFD6E8' }]}>
                                <Feather name="lock" size={20} color="#F43F8A" />
                            </View>
                            <Text style={landingStyles.cardTitle}>Secure Data</Text>
                            <Text style={landingStyles.cardText}>Your family's privacy is our top priority.</Text>
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
                        <Text style={landingStyles.signupButtonText}>Create Free Account</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={landingStyles.loginButton}
                        onPress={() => navigation.navigate('Login')}
                        activeOpacity={0.6}
                    >
                        <Text style={landingStyles.loginButtonText}>Log In</Text>
                    </TouchableOpacity>

                    {/* FOOTER */}
                    <View style={landingStyles.footer}>
                        <Text style={landingStyles.footerText}>Data Secured • Pediatric Approved</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Terms')} activeOpacity={0.7}>
                            <Text style={[landingStyles.footerText, { textDecorationLine: 'underline' }]}>Terms And Conditions</Text>
                        </TouchableOpacity>
                        <Text style={landingStyles.footerTextSmall}>© 2026 Healthy Mom & Baby</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

import React, { useEffect, useRef } from 'react';
import {
    Animated,
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Platform
} from 'react-native';
import { useFlash } from '../context/FlashContext';

const FlashMessage = () => {
    const { flash } = useFlash();
    const opacity = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(-100)).current;

    useEffect(() => {
        if (flash) {
            // Slide Down and Fade In
            Animated.parallel([
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 400,
                    useNativeDriver: true,
                }),
                Animated.timing(translateY, {
                    toValue: 0,
                    duration: 400,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            // Slide Up and Fade Out
            Animated.parallel([
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 400,
                    useNativeDriver: true,
                }),
                Animated.timing(translateY, {
                    toValue: -100,
                    duration: 400,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [flash, opacity, translateY]);

    if (!flash && opacity._value === 0) return null;

    const getBackgroundColor = () => {
        switch (flash?.type) {
            case 'success': return '#10b981'; // Green
            case 'error': return '#ef4444';   // Red
            case 'warning': return '#f59e0b'; // Amber
            default: return '#3b82f6';      // Blue
        }
    };

    return (
        <SafeAreaView style={styles.container} pointerEvents="none">
            <Animated.View
                style={[
                    styles.flash,
                    {
                        backgroundColor: getBackgroundColor(),
                        opacity,
                        transform: [{ translateY }],
                    },
                ]}
            >
                <Text style={styles.text}>{flash?.message}</Text>
            </Animated.View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        alignItems: 'center',
    },
    flash: {
        width: '90%',
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 12,
        marginTop: Platform.OS === 'android' ? 40 : 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 6,
    },
    text: {
        color: '#ffffff',
        fontSize: 15,
        fontWeight: '700',
        textAlign: 'center',
    },
});

export default FlashMessage;

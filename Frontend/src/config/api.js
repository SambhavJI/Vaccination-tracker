import { Platform } from 'react-native';
import Constants from 'expo-constants';

/**
 * API base URL for the backend.
 */
function getApiUrl() {
    const override = Constants.expoConfig?.extra?.apiUrl ?? process.env.EXPO_PUBLIC_API_URL;
    if (override) return override;

    if (Platform.OS === 'web') {
        return 'http://localhost:3000';
    }

    // On device: use same host as Expo bundler
    const hostUri = Constants.expoConfig?.hostUri
        ?? Constants.manifest2?.extra?.expoGo?.debuggerHost
        ?? Constants.manifest?.debuggerHost ?? '';
    const host = (hostUri || '').split(':')[0];
    if (host && host !== 'localhost') {
        return `http://${host}:3000`;
    }

    return 'http://localhost:3000';
}

export const API_URL = getApiUrl();

import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    FlatList,
    Modal,
    TextInput,
    Alert,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as WebBrowser from 'expo-web-browser';
import { Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DocumentStyles as styles } from '../styles/DocumentStyles';
import { apiGet, apiUpload, apiDelete } from '../config/apiRequest';

export default function DocumentScreen({ navigation }) {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [newDocName, setNewDocName] = useState('');
    const [pickedFile, setPickedFile] = useState(null);
    const [error, setError] = useState(null);

    const fetchDocuments = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const token = await AsyncStorage.getItem('userToken');
            console.log('[Documents] token:', token ? 'found' : 'MISSING');
            const { response, data } = await apiGet('/user/documents', token);
            console.log('[Documents] status:', response.status, 'data:', JSON.stringify(data));
            if (response.ok) {
                setDocuments(data);
            } else {
                setError(data.message || 'Failed to load documents.');
            }
        } catch (err) {
            console.log('[Documents] fetch error:', err.message);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDocuments();
    }, [fetchDocuments]);

    const handlePickFile = async () => {
        try {
            console.log('[Upload] Opening file picker...');
            const result = await DocumentPicker.getDocumentAsync({
                type: ['application/pdf', 'image/jpeg', 'image/png'],
                copyToCacheDirectory: true,
            });
            console.log('[Upload] Picker result:', JSON.stringify(result));
            if (!result.canceled && result.assets && result.assets.length > 0) {
                const file = result.assets[0];
                console.log('[Upload] File picked:', file.name, file.mimeType, file.uri);
                setPickedFile(file);
                if (!newDocName.trim()) {
                    setNewDocName(file.name.replace(/\.[^/.]+$/, ''));
                }
            } else {
                console.log('[Upload] Picker cancelled or no file selected');
            }
        } catch (e) {
            console.log('[Upload] Picker error:', e.message);
            Alert.alert('Error', 'Could not open the file picker.');
        }
    };

    const handleUpload = async () => {
        if (!pickedFile) {
            Alert.alert('No file selected', 'Please pick a file first.');
            return;
        }

        setUploading(true);
        try {
            const token = await AsyncStorage.getItem('userToken');

            let documentToUpload;
            if (Platform.OS === 'web' && pickedFile.file) {
                documentToUpload = pickedFile.file;
            } else {
                const fileResponse = await fetch(pickedFile.uri);
                documentToUpload = await fileResponse.blob();
            }

            const formData = new FormData();
            formData.append('document', documentToUpload, pickedFile.name);
            formData.append('name', newDocName.trim() || pickedFile.name);

            const { response, data } = await apiUpload('/user/upload', formData, token);

            if (response.ok) {
                setDocuments(prev => [data.document, ...prev]);
                closeModal();
            } else {
                Alert.alert('Upload failed', `Server returned ${response.status}: ${data.message}`);
            }
        } catch (err) {
            Alert.alert('Network Error', err.message);
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (docId, docName) => {
        if (!docId) {
            Alert.alert('Debug Tool', 'Button clicked, but docId is missing!');
            return;
        }

        const performDelete = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                const { response, data } = await apiDelete(`/user/document/${docId}`, token);
                if (response.ok) {
                    setDocuments(prev => prev.filter(d => d._id !== docId));
                } else {
                    Alert.alert('Error', `API Error: ${response.status} - ${data.message || 'Could not delete'}`);
                }
            } catch (err) {
                Alert.alert('Network Error', err.message);
            }
        };

        if (Platform.OS === 'web') {
            const confirmed = window.confirm(`Are you sure you want to delete "${docName}"?`);
            if (confirmed) {
                await performDelete();
            }
        } else {
            Alert.alert(
                'Delete Document',
                `Are you sure you want to delete "${docName}"?`,
                [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Delete', style: 'destructive', onPress: performDelete },
                ]
            );
        }
    };

    const closeModal = () => {
        setModalVisible(false);
        setNewDocName('');
        setPickedFile(null);
    };

    const getFileIcon = (url = '') => {
        if (url.match(/\.(jpg|jpeg|png|gif|webp)/i)) return { icon: 'file-image-o', iconColor: '#3b82f6', bgColor: '#dbeafe' };
        return { icon: 'file-pdf-o', iconColor: '#ef4444', bgColor: '#fee2e2' };
    };

    const handleViewDocument = async (url) => {
        try {
            if (!url) {
                Alert.alert('Error', 'Document URL is empty or corrupted.');
                return;
            }

            // Cloudinary can automatically convert the first page of a PDF to an image.
            // This natively bypasses all missing native PDF viewers on the Android/Windows emulator.
            let viewUrl = url;
            if (url.toLowerCase().endsWith('.pdf')) {
                viewUrl = url.replace(/\.pdf$/i, '.jpg');
            }

            if (Platform.OS === 'web') {
                window.open(viewUrl, '_blank');
            } else {
                await WebBrowser.openBrowserAsync(viewUrl);
            }
        } catch (e) {
            Alert.alert('Error', 'Could not open the document.');
        }
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    };

    const renderDocumentCard = ({ item }) => {
        const { icon, iconColor, bgColor } = getFileIcon(item.url);
        return (
            <View style={styles.card}>
                <View style={[styles.iconContainer, { backgroundColor: bgColor }]}>
                    <FontAwesome name={icon} size={24} color={iconColor} />
                </View>
                <View style={styles.cardContent}>
                    <Text style={styles.documentName}>{item.name || 'Document'}</Text>
                    <View style={styles.documentMeta}>
                        <Text style={styles.documentType}>
                            {item.url?.match(/\.(jpg|jpeg|png|gif|webp)/i) ? 'Image' : 'PDF'}
                        </Text>
                        <Text style={styles.documentDate}>{formatDate(item.uploadedAt)}</Text>
                    </View>
                </View>
                <View style={styles.cardActions}>
                    <TouchableOpacity
                        onPress={() => handleViewDocument(item.url)}
                        style={styles.viewButton}
                    >
                        <Ionicons name="eye-outline" size={24} color="#3b82f6" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleDelete(item._id, item.name)}
                        style={styles.deleteButton}
                    >
                        <Ionicons name="trash-outline" size={24} color="#ef4444" />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };


    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={24} color="#64748b" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>My Documents</Text>
            </View>

            {loading ? (
                <View style={styles.emptyContainer}>
                    <ActivityIndicator size="large" color="#e8703a" />
                </View>
            ) : error ? (
                <View style={styles.emptyContainer}>
                    <FontAwesome name="exclamation-circle" size={48} color="#ef4444" />
                    <Text style={[styles.emptyText, { color: '#ef4444' }]}>{error}</Text>
                    <TouchableOpacity onPress={fetchDocuments} style={{ marginTop: 12 }}>
                        <Text style={{ color: '#e8703a', fontWeight: '600' }}>Retry</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <FlatList
                    data={documents}
                    keyExtractor={(item) => item._id}
                    renderItem={renderDocumentCard}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <FontAwesome name="folder-open-o" size={48} color="#cbd5e1" />
                            <Text style={styles.emptyText}>No documents uploaded yet.</Text>
                        </View>
                    }
                />
            )}

            <TouchableOpacity
                style={styles.fab}
                onPress={() => setModalVisible(true)}
            >
                <Ionicons name="add" size={32} color="#ffffff" />
            </TouchableOpacity>

            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={closeModal}
            >
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>Upload Document</Text>
                                <TouchableOpacity onPress={closeModal}>
                                    <Ionicons name="close" size={24} color="#64748b" />
                                </TouchableOpacity>
                            </View>

                            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                                <TouchableOpacity style={styles.pickFileButton} onPress={handlePickFile}>
                                    <Ionicons name="document-attach-outline" size={20} color="#e8703a" />
                                    <Text style={styles.pickFileText}>
                                        {pickedFile ? pickedFile.name : 'Choose File (PDF / Image)'}
                                    </Text>
                                </TouchableOpacity>

                                <Text style={styles.inputLabel}>Document Name</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="e.g. Blood Test Results"
                                    value={newDocName}
                                    onChangeText={setNewDocName}
                                    placeholderTextColor="#94a3b8"
                                />

                                <TouchableOpacity
                                    style={[styles.submitButton, uploading && { opacity: 0.6 }]}
                                    onPress={handleUpload}
                                    disabled={uploading}
                                >
                                    {uploading
                                        ? <ActivityIndicator color="#fff" />
                                        : <Text style={styles.submitButtonText}>Upload</Text>
                                    }
                                </TouchableOpacity>
                            </ScrollView>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </SafeAreaView>
    );
}

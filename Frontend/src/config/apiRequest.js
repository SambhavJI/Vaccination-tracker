import { API_URL } from './api';

const REQUEST_TIMEOUT = 15000; // 15 seconds

async function fetchWithTimeout(url, options = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal,
        });
        clearTimeout(timeoutId);
        return response;
    } catch (err) {
        clearTimeout(timeoutId);
        if (err.name === 'AbortError') {
            const e = new Error('Connection timed out. Check that your phone and PC are on the same Wi-Fi and the backend is running.');
            e.isNetwork = true;
            throw e;
        }
        const e = new Error('Connection failed. Check that your phone and PC are on the same Wi-Fi and the backend is running.');
        e.isNetwork = true;
        throw e;
    }
}

export async function apiPost(path, body) {
    const response = await fetchWithTimeout(`${API_URL}${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });
    let data;
    try {
        data = await response.json();
    } catch {
        data = { message: 'Invalid response from server' };
    }
    return { response, data };
}

export async function apiGet(path, token) {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const response = await fetchWithTimeout(`${API_URL}${path}`, { method: 'GET', headers });
    let data;
    try {
        data = await response.json();
    } catch {
        data = { message: 'Invalid response from server' };
    }
    return { response, data };
}

export async function apiPostAuth(path, body, token) {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const response = await fetchWithTimeout(`${API_URL}${path}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
    });
    let data;
    try {
        data = await response.json();
    } catch {
        data = { message: 'Invalid response from server' };
    }
    return { response, data };
}

export function apiUpload(path, formData, token) {
    return new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `${API_URL}${path}`);
        if (token) xhr.setRequestHeader('Authorization', `Bearer ${token}`);
        xhr.onload = () => {
            let data;
            try { data = JSON.parse(xhr.responseText); }
            catch { data = { message: 'Invalid response from server' }; }
            resolve({ response: { ok: xhr.status >= 200 && xhr.status < 300, status: xhr.status }, data });
        };
        xhr.onerror = () => {
            resolve({ response: { ok: false, status: 0 }, data: { message: 'Network error' } });
        };
        xhr.send(formData);
    });
}

export async function apiPutAuth(path, body, token) {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const response = await fetchWithTimeout(`${API_URL}${path}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(body),
    });
    let data;
    try {
        data = await response.json();
    } catch {
        data = { message: 'Invalid response from server' };
    }
    return { response, data };
}

export async function apiDelete(path, token) {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const response = await fetchWithTimeout(`${API_URL}${path}`, {
        method: 'DELETE',
        headers,
    });
    let data;
    try {
        data = await response.json();
    } catch {
        data = { message: 'Invalid response from server' };
    }
    return { response, data };
}

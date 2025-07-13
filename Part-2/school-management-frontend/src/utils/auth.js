export function isAuthenticated() {
    const token = getToken();
    if (!token) return null;
    
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Date.now() / 1000;
        
        // Check if token is expired
        if (payload.exp && payload.exp < currentTime) {
            localStorage.removeItem('token');
            return null;
        }
        
        return payload;
    } catch (error) {
        console.error('Error decoding token:', error);
        localStorage.removeItem('token');
        return null;
    }
}

export function setToken(token) {
    if (token) {
        localStorage.setItem('token', token);
    }
}

export function logout() {
    localStorage.removeItem('token');
}

export function getToken() {
    return localStorage.getItem('token');
}
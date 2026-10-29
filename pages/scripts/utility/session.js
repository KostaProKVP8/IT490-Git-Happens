export function saveSession(sessionId) {
    sessionStorage.setItem("sessionId", sessionId);
}

export function getSession() {
    return sessionStorage.getItem("sessionId");
}

export function clearSession() {
    sessionStorage.removeItem("sessionId");
}
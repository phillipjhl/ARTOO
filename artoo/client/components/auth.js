import { AUTH_TOKEN } from "../config/dev";

export function setAuth(token = "") {
    localStorage.setItem('auth_token', AUTH_TOKEN || token);
}

export function resetAuth() {
    localStorage.removeItem('auth_token');
}

let auth_token = "";

export function getAuth() {
    if (localStorage.getItem('auth_token') == null) {
        setAuth();
    }
    auth_token = localStorage.getItem('auth_token');
    return auth_token;
}
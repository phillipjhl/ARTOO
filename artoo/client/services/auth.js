import { AUTH_TOKEN, CLIENT_CODE, CLIENT_KEY, CLIENT_SECRET, BASE_URL, REFRESH_TOKEN } from "../config/dev";

let refresh_token = REFRESH_TOKEN;
let auth_token = AUTH_TOKEN;

export function setAuth(token = "") {
    localStorage.setItem('auth_token', auth_token || token);
}

export function setRefreshToken(token = "") {
    localStorage.setItem('refresh_token', refresh_token || token)
}

export function resetAuth() {
    localStorage.removeItem('auth_token');
}

export function getAuth() {
    if (localStorage.getItem('auth_token') == null) {
        setAuth();
    }
    auth_token = localStorage.getItem('auth_token');
    return auth_token;
}

export function getRefresh() {
    if (localStorage.getItem('refresh_token') == null) {
        setRefreshToken();
    }
    refresh_token = localStorage.getItem('refresh_token');
    return refresh_token;
}

export function resetRefresh() {
    localStorage.removeItem('refresh_token');
}

export async function refreshToken() {
    let tempRefresh = getRefresh();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    // myHeaders.append('Host', "127.0.0.1")
    let formData = {
        "client_secret": CLIENT_SECRET,
        "client_id": CLIENT_KEY,
        "redirect_uri": "http://127.0.0.1:8000/auth/redirect",
        "grant_type": "refresh_token",
        "refresh_token": tempRefresh
    }
    var urlencoded = new URLSearchParams(formData);
    // urlencoded.append("code", CLIENT_CODE);
    // urlencoded.append("client_secret", CLIENT_SECRET);
    // urlencoded.append("client_id", CLIENT_KEY);
    // urlencoded.append("redirect_uri", "http://127.0.0.1:8000/auth/redirect");
    // urlencoded.append("grant_type", "refresh_token");
    // urlencoded.append('refresh_token', refresh_token);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
    };

    try {
        let resp = await fetch(`/oauth2/token/`, requestOptions);
        let json = await resp.json();
        console.log(json);
        if (json.ok) {
            auth_token = json.access_token;
            refresh_token = json.refresh_token
            setAuth(json.access_token);
            setRefreshToken(json.refresh_token);
            return auth_token
        } else {
            resetRefresh()
            throw 'Bad Response'
        }
    } catch (error) {
        console.log(error)
        throw `${error}`
    }
}
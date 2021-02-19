import { AUTH_TOKEN, CLIENT_CODE, CLIENT_KEY, BASE_URL } from "../config/dev";

let refresh_token = null;

export function setAuth(token = "") {
    localStorage.setItem('auth_token', AUTH_TOKEN || token);
}

export function setRefreshToken(token = "") {
    localStorage.setItem('refresh_token', refresh_token || token)
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

export async function refreshToken() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    // urlencoded.append("code", CLIENT_CODE);
    urlencoded.append("client_secret", CLIENT_SECRET);
    urlencoded.append("client_id", CLIENT_KEY);
    urlencoded.append("redirect_uri", "http://127.0.0.1:8000/auth/redirect");
    urlencoded.append("grant_type", "refresh_token");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    try {
        let resp = await fetch(`${BASE_URL}/oauth2/token/`, requestOptions);
        let json = await JSON.parse(resp.body)
        setAuth(json.access_token);
        setRefreshToken(json.refresh_token);
        return json.access_token
    } catch (error) {
        console.log(error)
    }
}
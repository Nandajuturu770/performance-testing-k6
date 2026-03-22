// teacher login auth api
import http from 'k6/http';
import { check } from 'k6'
import { credentials, url } from '../utils/config.js';

const BASE_URI = __ENV.BASE_URL || url.AUTH_BASE_URL;
const PATH_URI = '/api/v1/auth/login';
let token;

export const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'x-tenant-id': credentials.tenantId
}

export const payload = JSON.stringify({
    userName: credentials.username,
    password: credentials.password,
    rememberMe: true,
    userRoleId: 3,
    deviceType: "Web",
    organizationId: null
});

export function teacherLoginAPI() {
    const response = http.post(`${BASE_URI}${PATH_URI}`, payload, { headers: headers });
    check(response, {
        'teacher login status 201': (r) => r.status === 201,
        'teacher login < 1s': (r) => r.timings.duration < 500
    })
    token = response.json('token');
    console.log(token)
    return token;
}
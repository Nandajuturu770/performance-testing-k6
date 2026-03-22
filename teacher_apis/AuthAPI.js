import http from 'k6/http';
import { sleep, check } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

const BASE_URI = __ENV.BASE_URL || 'https://auth.thetopschool.com';
const PATH_URI = '/api/v1/auth/login';

// defining virtual users
export const options = {
    vus: 1,
    duration: '1s'
};

// setting headers
export const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'x-tenant-id': '19g6wltreg6p6'
}
// preparing request body
export const payload = JSON.stringify({
    userName: "navanitha01",
    password: "Test@123",
    rememberMe: true,
    userRoleId: 3,
    deviceType: "Web",
    organizationId: null
});

// creating request
export default function () {
    const response = http.post(`${BASE_URI}${PATH_URI}`, payload, { headers: headers});
    sleep(1);
    check(response, {
        'response code': (r) => r.status === 201,
    })
}

// creating report
export function handleSummary(data) {
    const time = new Date();
    const localeTime = time.toLocaleTimeString();
    const exactTime = `${time.getFullYea()}-${time.getMonth()}-${time.getDate()}-${time.getHours()}-${time.getMinutes()}-${time.getMilliseconds()}`;
    const safeTime = time.replace(/:/g, '-');
    return {
        [`reports/report${exactTime}.html`]: htmlReport(data),
    }
}
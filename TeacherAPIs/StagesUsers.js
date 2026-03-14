import http from 'k6/http'
import { sleep, check } from 'k6'
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

const BASE_URL = __ENV.BASE_URL || 'https://test.k6.io';

export const options = {
    stages: [
        { duration: '5s', target: 5 },
        { duration: '3s', target: 10 },
        { duration: '5s', target: 1 }
    ]
}

export default function () {
    const response = http.get(BASE_URL);
    sleep(1);
    check(response, {
        'status code 200': (r) => r.status === 200
    })
}

export function handleSummary(data) {
    return {
        'report1.html': htmlReport(data),
    }
}
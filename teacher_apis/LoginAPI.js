import http from 'k6/http'
import { sleep, check } from 'k6'
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
    vus: 10,
    duration: '10s',
    thresholds: {
        http_req_duration: ['p(95)<100']
    },
}

export default function () {
    const response = http.get('https://test.k6.io');
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
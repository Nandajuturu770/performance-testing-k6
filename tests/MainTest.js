import { teacherLoginAPI } from '../apis/AuthAPI.js';
import { getLatest10QuestionPapersCreated } from '../apis/AssessAPI.js';
import { sleep } from 'k6';
import { htmlReport } from '../utils/bundle.js';

export const options = {

    scenarios: {

        teacher_login_scenario: {
            executor: 'constant-vus',
            vus: 3,
            duration: '3s',
            // startVUs: 0,
            // stages: [
            //     { duration: '10s', target: 5 },
            //     { duration: '20s', target: 5 },
            //     { duration: '10s', target: 0 },
            // ],
            exec: 'teacherAPI',
        },

        student_question_page_scenario: {
            executor: 'constant-vus',
            vus: 2,
            duration: '2s',
            // startVUs: 0,
            // stages: [
            //     { duration: '5s', target: 3 },
            //     { duration: '15s', target: 3 },
            //     { duration: '5s', target: 0 },
            // ],
            exec: 'assessAPI',
        }
    },

    thresholds: {
        http_req_duration: ['p(95)<1000'],
        http_req_failed: ['rate<0.01'],
    }
};

export function teacherAPI() {
    teacherLoginAPI();
    sleep(1);
}

export function assessAPI() {
    getLatest10QuestionPapersCreated();
    sleep(1);
}

export function handleSummary(data) {
    const now = new Date();
    const formattedTime = now.toISOString().replace(/[:.]/g, '-');
    return {
        [`../reports/report_${formattedTime}.html`]: htmlReport(data),
    };
}
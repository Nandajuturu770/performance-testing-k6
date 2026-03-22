// getting all question which are created
import http from 'k6/http';
import { check } from 'k6'
import { url } from '../utils/config.js';

const BASE_URI = __ENV.BASE_URL || url.ASSESS_URL;
const PATH_URI = '/assess/1.0.0/question/paper?searchKey=&sortKey=&sortKeyOrder=&questionPaperTypeId=&questionPaperStatus=&gradeIds=&courseIds=&pageNo=0&pageSize=10&minMarks=&maxMarks=&academicYearIds=4';

export function getLatest10QuestionPapersCreated() {
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
    }
    const response = http.get(`${BASE_URI}${PATH_URI}`, { headers: headers });
    check(response, {
        'status is 200/201': (r) => r.status === 200,
        'status line': (r) => r.status_text == 'OK',
        'response < 500ms': (r) => r.timings.duration < 500
    });
    console.log(response.body);
}
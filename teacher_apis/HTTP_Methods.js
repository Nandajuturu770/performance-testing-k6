import { get, http } from 'k6/http';
import { sleep , check } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

const BASE_URI = __ENV.BASE_URI || 'application url';

// get method - retrieving data from the server
export default function(){
    const response = get(BASE_URI);
    sleep(1);
    check(response, {
        'status code' : (r) => r.status ===200,
        'response time' : (r) => r.timings.duration < 500
    })
}

export default function(){
    const response = http.post(BASE_URI);
}

export function handleSummary(data){
    return{
        'report1.html': htmlReport(data),
    }
}
import email from "./src/emailCreate.js";

let response = await email();
response = JSON.parse(response);
console.log(response);
export default {
    email: response.result.name + '@developermail.com',
    emailId: response.result.token,
    emailName: response.result.name,
    name: 'jean paul',
    username: 'jeanpaul737096',
    password: 'Fifou1234&*',
    month: 6,
    day: 23,
    year: 2000
}
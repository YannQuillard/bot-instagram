import fetch from 'node-fetch';
import email from "./emailRecover.js";

/**
 * @param id
 * @returns {Promise<unknown>}
 */
export default async function(id, token){
    const response = await email(id, token);
    console.log(JSON.stringify(response.result));
    return new Promise( (resolve) => {
        fetch(`https://www.developermail.com/api/v1/mailbox/${id}/messages`, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'X-MailboxToken': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(response.result)
        }).then(res => res.json()).then(json => {resolve(json)});
    });
}



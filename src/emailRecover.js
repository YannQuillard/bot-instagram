import https from 'https';

/**
 * @param id
 * @returns {Promise<unknown>}
 */
export default async function(id, token){
    return new Promise( (resolve => {
        const options = {
            hostname: 'developermail.com',
            port: 443,
            path: `/api/v1/mailbox/${id}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-MailboxToken': token
            }
        }
        const req = https.request(options, res => {
            res.on('data', d => {
                let response = JSON.parse(d.toString());
                resolve(response);
                console.log(response);
            })
        })

        req.on('error', error => {
            console.error(error)
        })

        req.end();
    }))
}
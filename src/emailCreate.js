import https from 'https';

/**
 * @returns {Promise<unknown>}
 */
export default async function(){
    return new Promise( (resolve => {
        const options = {
            hostname: 'developermail.com',
            port: 443,
            path: '/api/v1/mailbox',
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const req = https.request(options, res => {
            res.on('data', d => {
                resolve(d.toString());
            })
        })

        req.on('error', error => {
            console.error(error)
        })

        req.end();
    }))
}
const https = require('https');

const utils = {
    getHttpCall : async function(options){
        return new Promise((resolve) => {
            const request = https.request(options, (response) => {
                let data = '';
                response.on('data', (chunk) => {
                    data = data + chunk.toString();
                });
            
                response.on('end', () => {
                    const body = JSON.parse(data);
                    // need to implement error handling
                    resolve(body);
                });
            });
            request.end();
        });
    
    }
}

module.exports = utils;
const https = require('https')

async function refreshAccessToken(config) {
    const postData = new URLSearchParams({
        grant_type: "refresh_token",
        client_id: `${config.clientId}@${config.tenantID}`,
        client_secret: config.clientSecret,
        resource: `${config.applicationId}/${config.tenantName}.sharepoint.com@${config.tenantID}`,
        refresh_token: config.refreshToken,
    }).toString()
    
    const options = {
        hostname: 'accounts.accesscontrol.windows.net',
        port: 443,
        path: `/${config.tenantID}/tokens/OAuth/2`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }

    return new Promise((resolve, reject) => {
        const request = https.request(options, (response) => {
            let stringData = ''
        
            response.on('data', (chunk) => {
                stringData += chunk
            })
        
            response.on('end', () => {
                const data = JSON.parse(stringData)
                resolve(data["access_token"])
            })
        })
        
        request.on('error', (error) => {
            console.log("Error while refreshing access token")
            console.error(error)
            reject(error)
        })
        
        request.write(postData)
        request.end()
    })
}

module.exports = refreshAccessToken
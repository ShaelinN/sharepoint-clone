const auth = require('node-sp-auth')
const { request } = require('node-sp-auth/lib/src/config')

async function ListFiles(ServerRelativeUrl, accessToken, config) {
    const tenantName = config.tenantName
    const siteName = config.siteName

    const options = {
        clientId: config.clientId,
        clientSecret: config.clientSecret,
    }
    const siteURL = `https://${tenantName}.sharepoint.com/sites/${siteName}`

    try {
        const { headers } = await auth.getAuth(siteURL, options)
        headers['Authorization'] = `Bearer ${accessToken}`
        headers['Accept'] = 'application/json;odata=nometadata'

        url = `${siteURL}/_api/web/GetFolderByServerRelativeURL('/${ServerRelativeUrl}/')/Files/`
        const result = await request.get({
            headers: headers,
            url: url
        }).then(response => {
            folders = []

            body = JSON.parse(response["body"])["value"]
            for (index in body) {
                value = body[index]
                folders.push(value["ServerRelativeUrl"])
            }
            return folders
        })

        return result
    } catch (error) {
        console.log(`Failed to list files in folder ${ServerRelativeUrl} on site ${siteURL}`)
        console.error(error)
    }
}

module.exports = ListFiles
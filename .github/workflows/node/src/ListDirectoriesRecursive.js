const auth = require('node-sp-auth')
const { request } = require('node-sp-auth/lib/src/config')

async function listDirectoriesRecursive(accessToken, config) {
    const tenantName = config.tenantName
    const siteName = config.siteName
    const options = {
        clientId: config.clientId,
        clientSecret: config.clientSecret,
    }
    const serverRelativeRootDir = `sites/${siteName}/${config.sourceRootDir}`
    const siteURL = `https://${tenantName}.sharepoint.com/sites/${siteName}`

    let results = []
    
    results.push(serverRelativeRootDir)

    let index = 0
    while (index < results.length) {
        currentParentDir = results[index]

        const subdirs = await listSubdirectories(siteURL, currentParentDir, accessToken, options)
        results = results.concat(subdirs)
        index++
    }
    return results
}

async function listSubdirectories(siteURL, ServerRelativeUrl, accessToken, authOptions) {
    try {
        const { headers } = await auth.getAuth(siteURL, authOptions)
        headers['Authorization'] = `Bearer ${accessToken}`
        headers['Accept'] = 'application/json;odata=nometadata'

        url = `${siteURL}/_api/web/GetFolderByServerRelativeURL('/${ServerRelativeUrl}/')/Folders/`
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
        console.log(`Failed to list subfolders in folder ${ServerRelativeUrl} on site ${siteURL}`)
        console.error(error)
    }
}

module.exports = listDirectoriesRecursive
const path = require("path")
const Download = require("sp-download").Download

async function downloadFile(sourceFilePathFromRoot, destinationFilePathFromRoot, config) {
    const options = {
        clientId: config.clientId,
        clientSecret: config.clientSecret,
    }

    const download = new Download(options)

    let sourceURI = encodeURI(`https://${config.tenantName}.sharepoint.com${path.join(sourceFilePathFromRoot)}`)

    download.downloadFile(sourceURI, destinationFilePathFromRoot)
    .then(() => {
        console.log(`Successfully downloaded file from ${sourceURI} to ${destinationFilePathFromRoot}`)
    })
    .catch(err => {
        console.log(`Failed to download file from ${sourceURI} to ${destinationFilePathFromRoot}`)
        console.error(err)
    })
}

module.exports = downloadFile
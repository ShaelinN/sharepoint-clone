const fs = require("fs")

/**
 * initialize a config object based on a json file passed in
 * @param {string} configFilePath 
 */
async function initConfig(configFilePath) {
    try {
        const configFileContents = fs.readFileSync(configFilePath).toString()
        const configData = await JSON.parse(configFileContents)
        if (ensureConfigFields(configData)) {
            return configData
        }
    } catch (error) {
        console.log(`Error while loading config file`)
        console.error(error)
    }
}
/**
 * Check that the config object has all the fields needed to successfully run this job
 * @param {object} configObject 
 */
function ensureConfigFields(configObject) {
    necessaryFields = [
        "tenantName",
        "tenantID",
        "clientId",
        "clientSecret",
        "refreshToken",
        "applicationId",
        "siteName",
        "sourceRootDir",
        "destinationRootDir",
    ]

    for (i in necessaryFields) {
        if (necessaryFields[i] in configObject) {
            continue
        } else {
            console.error(`Missing required field in config: ${necessaryFields[i]}`)
            return false
        }
    }
    return true
}

module.exports = initConfig

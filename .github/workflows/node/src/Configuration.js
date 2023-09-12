const env = process.env

/**
 * Initialize a config object based on environment variables
 * @returns config object
 */
async function initConfig() {
    return {
        applicationId: env.APPLICATION_ID,
        clientId: env.CLIENT_ID,
        clientSecret: env.CLIENT_SECRET,
        destinationRootDir: env.DESTINATION_ROOT_DIR,
        refreshToken: env.REFRESH_TOKEN,
        siteName: env.SITE_NAME,
        sourceRootDir: env.SOURCE_ROOT_DIR,
        tenantID: env.TENANT_ID,
        tenantName: env.TENANT_NAME
    }
}

module.exports = initConfig

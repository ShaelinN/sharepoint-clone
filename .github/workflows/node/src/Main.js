const path = require("path")
const listDirectoriesRecursive = require("./ListDirectoriesRecursive")
const listFiles = require("./ListFiles")
const downloadFile = require("./DownloadFile")
const refreshAccessToken = require('./RefreshAccessToken')
const initConfig = require("./Configuration")

async function main() {
    try {
        const config = await initConfig()
        
        console.log(config)
        
        const accessToken = await refreshAccessToken(config)
    
        const allDirectories = await listDirectoriesRecursive(accessToken, config)
    
        for(i in allDirectories) {
            let dir = allDirectories[i]
    
            filesInDir = await listFiles(dir, accessToken, config)
    
            cut = path.join("/sites", config.siteName, config.sourceRootDir)
            localDir = path.join(config.destinationRootDir, dir.substring(cut.length + 1))
    
            if (filesInDir.length > 0) {
                for(j in filesInDir) {
                    filePath = filesInDir[j]
                    fileName = filePath.substring(dir.length + 1)
                    await downloadFile(filePath, path.join(localDir, fileName), config)
                }
            } else {
                console.log(`No downloads from empty directory ${dir}`)
            }
        }
    } catch (error) {
        console.error(error)
    }
}

main()

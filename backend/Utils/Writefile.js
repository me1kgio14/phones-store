const {writeFile} = require('fs/promises');

const WriteFile = async (path,data) => {
    try {
        await writeFile(path, JSON.stringify(data),"utf-8");
        return  {message: "File written successfully"}
    } catch (error) {
        return {message: error.message}
    }
}

module.exports = WriteFile;
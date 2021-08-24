import * as fs from 'fs';


async function resetData(dataDirectory) {
    try {
        // clean up data directory
        await fs.rmSync(dataDirectory, { recursive: true, force: true });

        // create directories
        fs.mkdirSync(dataDirectory, { recursive: true });
        fs.chmodSync(dataDirectory, '00777');

        // create files
        [
            { 
                'fileName': 'test1.txt', 
                'fileData': 'Here is some top secret data. '
            },
            { 
                'fileName': 'watchTest.txt', 
                'fileData': 'Test watching files'
            },
            { 
                'fileName': 'chmod.txt', 
                'fileData': 'Test access changes'
            }
        ].forEach(file => 
            fs.writeFileSync(`${dataDirectory}/${file.fileName}`, file.fileData));

        // create symbolic links
        fs.symlinkSync(`test1.txt`, `${dataDirectory}/test1-sym-link`);

        
    } catch (err) {
        console.log('Failed to reset data...')
        throw err;
    }    
}

export {
    resetData
};
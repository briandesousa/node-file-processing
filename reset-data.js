import * as fs from 'fs';


async function resetData(dataDirectory) {
    try {
        // clean up data directory
        await fs.rmSync(dataDirectory, { recursive: true, force: true });

        // create directories
        fs.mkdirSync(dataDirectory, { recursive: true });
        fs.chmodSync(dataDirectory, '00777');
        fs.mkdirSync(`${dataDirectory}/testDir1/nestedDir`, { recursive: true });
        
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
            },
            { 
                'fileName': 'testDir1/test2.txt', 
                'fileData': 'Test file in sub-directory'
            },
            { 
                'fileName': 'testDir1/test3.txt', 
                'fileData': 'Test file in sub-directory'
            }
        ].forEach(file => 
            fs.writeFileSync(`${dataDirectory}/${file.fileName}`, file.fileData));

        // create symbolic links
        try {
            fs.symlinkSync(`test1.txt`, `${dataDirectory}/test1-sym-link`);
        } catch(err) {
            if(err.code == 'EPERM') {
                console.log('Failed to create symbolic link with EPERM error. If this is running on Windows, some examples are expected to fail.');
                return;
            }
            throw err;
        }

        
    } catch (err) {
        console.log('Failed to reset data...')
        throw err;
    }    
}

export {
    resetData
};
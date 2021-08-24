import * as compareFsApi from './examples/compare-fs-api.js';
import * as fileExamples from './examples/files.js';
import * as fileMetadataExamples from './examples/file-metadata.js';
import * as linkExamples from './examples/links.js';
import * as directoryExamples from './examples/directories.js';
import { resetData } from './reset-data.js';
import { promisify } from 'util';
import os from 'os';


async function section(title, contentFunc) {
    const BRIGHT = "\x1b[1m"
    const RESET = "\x1b[0m"
    console.log(os.EOL, BRIGHT, title, RESET);  

    console.group();
    await contentFunc();
    console.groupEnd();
}

// prepare test files and directories
const DATA_DIR = './data';
await resetData(DATA_DIR);


await section('Comparing FS module APIs', async () => {
    console.log('1) Read a file with readFile() from the promise API:');
    await compareFsApi.usingPromiseAPI(`${DATA_DIR}/test1.txt`);

    console.log('2) Read a file with readFile() from the callback API:');
    // convert function to return a promise instead of accepting a callback to make this code synchronous
    const usingCallbackAPISynchronously = promisify(compareFsApi.usingCallbackAPI);
    await usingCallbackAPISynchronously(`${DATA_DIR}/test1.txt`);

    console.log('3) Read a file with readFileSync() from the sync API:');
    compareFsApi.usingSyncApi(`${DATA_DIR}/test1.txt`);
});

await section('Working with files', async () => {

    await section('fs.promises.openFile()', async () => {
        console.log('1) Open a file:');
        await fileExamples.openFile(`${DATA_DIR}/test1.txt`);
    
        console.log('2) Open a directory:');
        await fileExamples.openFile(`${DATA_DIR}`);
    
        console.log('3) Fail to open a file that does not exist:');
        await fileExamples.openFile(`${DATA_DIR}/nonexistant.txt`);
    });

    await section('fs.promises.readFile()', async () => {
        console.log('1) Read a file:');
        await fileExamples.readFile(`${DATA_DIR}/test1.txt`);
    
        console.log('2) Fail to read a file opened in append mode:');
        await fileExamples.readFileInAppendMode(`${DATA_DIR}/test1.txt`);

        console.log('3) Read a file as base64 encoding:');
        await fileExamples.readFileAsBase64(`${DATA_DIR}/test1.txt`);

        console.log('4) Start to read a file but abort the operation early:');
        await fileExamples.readFileAbort(`${DATA_DIR}/test1.txt`);
    });

    await section('fs.promises.copyFile()', async () => {
        console.log('1) Create a copy of a file:');
        await fileExamples.copyFile(`${DATA_DIR}/test1.txt`, `${DATA_DIR}/test1-copy.txt`);

        console.log('2) Create a second copy of a file and overwrite the destination if it already exists:');
        await fileExamples.copyFile(`${DATA_DIR}/test1.txt`, `${DATA_DIR}/test1-copy.txt`);

        console.log('3) Fail to create a third copy of a file because destination already exists:')
        await fileExamples.copyFileExcl(`${DATA_DIR}/test1.txt`, `${DATA_DIR}/test1-copy.txt`);
    });

    await section('fs.promises.appendFile()', async () => {
        console.log('1) Append data to an existing file:');
        await fileExamples.appendFile(`${DATA_DIR}/test1.txt`, ' More important data.');

        console.log('2) Append data to a file that doesn\'t exist yet:');
        await fileExamples.appendFile(`${DATA_DIR}/appendNew.txt`, 'More important data.');
    });

    await section('fs.promises.writeFile()', async () => {
        console.log('1) Write data to a new file:');
        await fileExamples.writeFile(`${DATA_DIR}/writeNew.txt`, 'This data was written.');

        console.log('2) Write data to an existing file:');
        await fileExamples.writeFileOverwrite(`${DATA_DIR}/writeNew.txt`, 'Rewritten.');
    });

    await section('fs.promises.truncate()', async () => {
        console.log('1) Truncate data in existing file:');
        await fileExamples.truncateFile(`${DATA_DIR}/test1.txt`, 29);
    });

    await section('fs.promises.watch()', async () => {
        console.log('1) Watch for changes on a file for 3 seconds:');
        //TODO reenable
        //await fileExamples.watchFile(`${DATA_DIR}/watchTest.txt`, 3000);
    });

});

await section('Working with file metadata', async () => {

    await section('fs.promises.stat()', async () => {
        console.log('1) Read size of a file:');
        await fileMetadataExamples.readFileSize(`${DATA_DIR}/test1.txt`);

        console.log('2) Fail to read size of a folder (not possible native stat capability):');
        await fileMetadataExamples.readFileSize(`${DATA_DIR}`);

        console.log('3) View all stats of a file:');
        await fileMetadataExamples.readAllStats(`${DATA_DIR}/test1.txt`);
    });

    await section('fs.promises.access()', async () => {
        console.log('1) Check if a file is visible:');
        await fileMetadataExamples.testFileAccess(`${DATA_DIR}/test1.txt`);

        console.log('2) Fail to check access to a file that doesn\'t exist:');
        await fileMetadataExamples.testFileAccess(`${DATA_DIR}/nonexistent.txt`);

        console.log('3) Fail with no execute access on a file:');
        await fileMetadataExamples.testFileExecuteAccess(`${DATA_DIR}/test1.txt`);
    });

    await section('fs.promises.chmod()', async () => {
        console.log('1) Remove write access on file:');
        await fileMetadataExamples.updateFilePermissions(`${DATA_DIR}/chmod.txt`, '00500');
    });

    await section('fs.promises.chown()', async () => {
        console.log('1) Change user and group owners of a file to root:');
        await fileMetadataExamples.updateFileOwner(`${DATA_DIR}/chmod.txt`, 0, 0);

        console.log('2) Change ownership of file to non-existent user and group:');
        await fileMetadataExamples.updateFileOwner(`${DATA_DIR}/chmod.txt`, 12345, 12345);
    });

    await section('fs.promises.utimes()', async () => {
        console.log('1) Set access and modified timestamps on a file:');
        await fileMetadataExamples.updateFileTimestamp(`${DATA_DIR}/test1.txt`, new Date(2020,0,1), new Date(2020,0,1));
    });

    await section('fs.promises.realpath()', async () => {
        console.log('1) Get the real path of a relative path:');
        await fileMetadataExamples.getRealPath(DATA_DIR);

        console.log('2) Get the real path of a symbolic link:');
        await fileMetadataExamples.getRealPath(`${DATA_DIR}/test1-sym-link`);
    });

});

await section('Working with links', async () => {
    console.log('1) Create a hard link:');
    await linkExamples.createLink(`${DATA_DIR}/test1.txt`, 'test1-hard-link');

    console.log('2) Create a soft (symbolic) link:');
    await linkExamples.createSymbolicLink(`${DATA_DIR}/test1.txt`, `${DATA_DIR}/test1-soft-link`);
});


await section('Working with directories', async () => {

});

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
    console.log('4) Open a file:');
    await fileExamples.openFile(`${DATA_DIR}/test1.txt`);

    console.log('5) Open a directory:');
    await fileExamples.openFile(`${DATA_DIR}`);

    console.log('6) Fail to open a file that does not exist:');
    await fileExamples.openFile(`${DATA_DIR}/nonexistant.txt`);

    console.log('7) Read a file:');
    await fileExamples.readFile(`${DATA_DIR}/test1.txt`);

    console.log('8) Fail to read a file opened in append mode:');
    await fileExamples.readFileCreateFirst(`${DATA_DIR}/test1-write.txt`);

    console.log('9) Read a file as base64 encoding:');
    await fileExamples.readFileAsBase64(`${DATA_DIR}/test1.txt`);

    console.log('10) Start to read a file but abort the operation early:');
    await fileExamples.readFileAbort(`${DATA_DIR}/test1.txt`);

    console.log('11) Create a copy of a file:');
    await fileExamples.copyFile(`${DATA_DIR}/test1.txt`, `${DATA_DIR}/test1-copy.txt`);

    console.log('12) Create a second copy of a file and overwrite the destination if it already exists:');
    await fileExamples.copyFile(`${DATA_DIR}/test1.txt`, `${DATA_DIR}/test1-copy.txt`);

    console.log('13) Fail to create a third copy of a file because destination already exists:')
    await fileExamples.copyFileExcl(`${DATA_DIR}/test1.txt`, `${DATA_DIR}/test1-copy.txt`);

    console.log('14) Append data to an existing file:');
    await fileExamples.appendFile(`${DATA_DIR}/test1.txt`, ' More important data.');

    console.log('15) Append data to a file that doesn\'t exist yet:');
    await fileExamples.appendFile(`${DATA_DIR}/appendNew.txt`, 'More important data.');
    
    console.log('16) Write data to a new file:');
    await fileExamples.writeFile(`${DATA_DIR}/writeNew.txt`, 'This data was written.');

    console.log('17) Write data to an existing file:');
    await fileExamples.writeFileOverwrite(`${DATA_DIR}/writeNew.txt`, 'Rewritten.');

    console.log('18) Truncate data in existing file:');
    await fileExamples.truncateFile(`${DATA_DIR}/test1.txt`, 29);

    console.log('19) Watch for changes on a file for 3 seconds:');
    await fileExamples.watch(`${DATA_DIR}/watchTest.txt`, 3000);
});

await section('Working with file metadata', async () => {
    console.log('20) Read size of a file:');
    await fileMetadataExamples.readFileSize(`${DATA_DIR}/test1.txt`);

    console.log('21) Read size of a folder (unexpected folder size):');
    await fileMetadataExamples.readFileSize(`${DATA_DIR}`);

    console.log('22) View all stats of a file:');
    await fileMetadataExamples.readAllStats(`${DATA_DIR}/test1.txt`);
    
    console.log('23) Check if a file is visible:');
    await fileMetadataExamples.testFileAccess(`${DATA_DIR}/test1.txt`);

    console.log('24) Fail to check access to a file that doesn\'t exist:');
    await fileMetadataExamples.testFileAccess(`${DATA_DIR}/nonexistent.txt`);

    console.log('25) Fail execute access test on a file:');
    await fileMetadataExamples.testFileExecuteAccess(`${DATA_DIR}/test1.txt`);

    console.log('26) Remove write access on file:');
    await fileMetadataExamples.updateFilePermissions(`${DATA_DIR}/chmod.txt`, '00500');

    console.log('27) Change user and group owners of a file to root:');
    await fileMetadataExamples.updateFileOwner(`${DATA_DIR}/chmod.txt`, 0, 0);

    console.log('28) Change ownership of file to non-existent user and group:');
    await fileMetadataExamples.updateFileOwner(`${DATA_DIR}/chmod.txt`, 12345, 12345);

    console.log('29) Set access and modified timestamps on a file:');
    await fileMetadataExamples.updateFileTimestamp(`${DATA_DIR}/test1.txt`, new Date(2020,0,1), new Date(2020,0,1));

    console.log('30) Get the real path for a relative path:');
    await fileMetadataExamples.getRealPath(DATA_DIR);

    console.log('31) Get the real path for a soft (symbolic) link:');
    await fileMetadataExamples.getRealPath(`${DATA_DIR}/test1-sym-link`);
});

await section('Working with links', async () => {
    console.log('32) Create a hard link:');
    await linkExamples.createHardLink(`${DATA_DIR}/test1.txt`, `${DATA_DIR}/test1-hard-link`);

    console.log('33) Create a soft (symbolic) link:');
    await linkExamples.createSoftLink(`test1.txt`, `${DATA_DIR}/test1-soft-link`);

    console.log('34) Read contents of a soft (symbolic) link:');
    await linkExamples.readSoftLink(`${DATA_DIR}/test1-soft-link`);

    console.log('35) Fail to read contents of a hard link:');
    await linkExamples.readSoftLink(`${DATA_DIR}/test1-hard-link`);

    console.log('36) Set access and modified timestamps on a soft (symbolic) link:');
    await linkExamples.updateSoftLinkTimestamp(`${DATA_DIR}/test1-soft-link`, new Date(2020,0,1), new Date(2020,0,1));

    console.log('37) Fail to update permissions on a soft (symbolic) link:');
    await linkExamples.updateLinkPermissions(`${DATA_DIR}/test1-soft-link`, '00500');

    console.log('38) Change user and group owners of a soft (symbolic) link to root:');
    await linkExamples.updateLinkOwner(`${DATA_DIR}/test1-soft-link`, 0, 0);

    console.log('39) Remove a soft (symbolic) link:');
    await linkExamples.removeLink(`${DATA_DIR}/test1-soft-link`);

    console.log('40) Remove a hard link (and the underlying file it is linked to):');
    await linkExamples.removeLink(`${DATA_DIR}/test1-hard-link`);
});

await section('Working with directories', async () => {
    console.log('41) Open a directory:');
    await directoryExamples.openDirectory(`${DATA_DIR}/testDir1`);

    console.log('42) Fail to open a file as a directory:');
    await directoryExamples.openDirectory(`${DATA_DIR}/test1.txt`);

    console.log('43) Read contents of a directory:');
    await directoryExamples.readDirectory(`${DATA_DIR}/testDir1`);

    console.log('44) Read contents of a directory with file types:');
    await directoryExamples.readDirectoryWithFileTypes(`${DATA_DIR}/testDir1`);

    console.log('45) Create a directory:');
    await directoryExamples.createDirectory(`${DATA_DIR}/testDir2`);

    console.log('46) Create multiple directories recursively:');
    await directoryExamples.createDirectoryRecursively(`${DATA_DIR}/testDir3/nestedDir`);

    console.log('47) Rename a directory:');
    await directoryExamples.renameDirectory(`${DATA_DIR}/testDir3`, `${DATA_DIR}/testDir3-renamed`);

    console.log('48) Remove a directory:');
    await directoryExamples.removeDirectory(`${DATA_DIR}/testDir2`);

    console.log('49) Remove a directory tree recursively using deprecated rmdir() function:');
    await directoryExamples.removeDirectoryRecursively(`${DATA_DIR}/testDir3-renamed`);

    console.log('50) Remove a directory tree recursively with rm() function:');
    await directoryExamples.removeDirectoryRecursivelyWithoutWarning(`${DATA_DIR}/testDir1`);

    console.log('51) Remove a non-existent directory with force option to avoid failure:');
    await directoryExamples.removeDirectoryRecursivelyWithoutWarning(`${DATA_DIR}/nonExistentDir`);
});

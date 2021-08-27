import * as fs from 'fs';
import * as fsPromises from 'fs/promises';

async function readFileSize(path) {
    try {
        const fileStats = await fsPromises.stat(path);
        console.log(`size of ${path} is ${fileStats.size} bytes`);
    } catch (err) {
        console.error(err.message);
    }
}

async function readAllStats(path) {
    try {
        const fileStats = await fsPromises.stat(path);
        console.log(`stats for ${path}:`);
        console.log(fileStats);
    } catch (err) {
        console.error(err.message);
    }
}

async function updateFileTimestamp(path, accessTime, modifyTime) {
    try {
        let {atimeMs: originalAccessTime, mtimeMs: originalModifiedTime} = await fsPromises.stat(path);
        console.log(`access time for ${path} before update: ${new Date(originalAccessTime)}`);
        console.log(`modify time for ${path} before update: ${new Date(originalModifiedTime)}`);

        await fsPromises.utimes(path, accessTime, modifyTime);
        console.log(`updated access and modified timestamp on ${path} to ${accessTime} and ${modifyTime} respectively`);
    } catch (err) {
        console.error(err.message);
    }
}

async function getRealPath(path) {
    try {
        const realPath = await fsPromises.realpath(path);
        console.log(`real path of ${path} is ${realPath}`);
    } catch (err) {
        console.error(err.message);
    }
}

async function testFileAccess(path) {
    try {
        await fsPromises.access(path);
        console.log(`${path} is visible`)
    } catch (err) {
        console.error(err.message);
    }
}

async function testFileExecuteAccess(path) {
    // Execute access applies to Linux systems only (no effect on Windows)
    try {
        console.log(`remove execute access from ${path}`);
        fs.chmodSync(path, '00200');

        await fsPromises.access(path, fs.constants.X_OK); 
        console.log(`${path} is executable`)
    } catch (err) {
        console.error(err.message);
    }
}

async function updateFilePermissions(path, mode) {
    try {
        console.log(`set ${mode} permissions on ${path}`);
        await fsPromises.chmod(path, mode);
        const stat = await fsPromises.stat(path);
        const modeAsDecimal = parseInt(stat.mode.toString(8), 10);
        console.log(`mode for ${path}: ${modeAsDecimal}`);
    } catch (err) {
        console.error(err.message);
    }
}

async function updateFileOwner(path, uid, gid) {
    try {
        await fsPromises.chown(path, uid, gid);
        console.log(`changed ownership of ${path}, uid = ${uid}, gid =${gid})`);
    } catch (err) {
        console.error(err.message);
    }
}

export {
    readFileSize,
    readAllStats,
    updateFileTimestamp,
    getRealPath,
    testFileAccess,
    testFileExecuteAccess,
    updateFilePermissions,
    updateFileOwner
};